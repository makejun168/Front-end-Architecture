const superagent = require("superagent");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

const cliProgress = require("cli-progress");
const { rejects } = require("assert");

// 初始化进度条
const bar1 = new cliProgress.SingleBar(
	{
		clearOnComplete: false,
	},
	cliProgress.Presets.shades_classic
);

let total;
let succeed = 0;

// const word = "猫咪"; 初始的时候使用下载猫咪的图片

const headers = {
	"Accept":
		"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Accept2": "text/plain, */*; q=0.01",
	"Accept-Encoding": "gzip, deflate, br",
	"Accept-Language": "zh-CN,zh;q=0.9",
	"Cache-Control": "no-store",
	"Connection": "keep-alive",
	"sec-ch-ua":
		'Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
};

// 优化格式化 图片对象 转换成数组
function getValueListByReg(str, key) {
	const reg = new RegExp(`"${key}":"(.*?)"`, "g");
	const matchesResult = str.match(reg);
	const resList = matchesResult.map((item) => {
		const url = item.match(/:"(.*?)"/g);
		return RegExp.$1;
	});
	return resList;
}

// 删除存放图片的目录 这段代码必须 用管理员的权限 执行 不然会缺失权限
function removeDir(pathname) {
	const fullPath = path.resolve(__dirname, pathname);

	const process = require("child_process");

	console.log(`${pathname} 目录已经存在，准备执行删除`);
	process.execSync(`rm -rf ${fullPath}`); // 可以在进程中 输入命令行的作用

	console.log(`历史目录${pathname} 删除完成`);
}

// 如果已经存在目录，则删除整个目录
function mkImageDir(pathname) {
	return new Promise((resolve, reject) => {
		const fullPath = path.resolve(__dirname, pathname); // 完整的当前目录路径

		// 判断是否存在目录
		if (fs.existsSync(fullPath)) {
			removeDir(pathname);
			//   reject(`${pathname} 目录已经存在，跳过`)
		}

		fs.mkdirSync(fullPath);
		console.log(`创建目录成功${pathname}成功`);
		return resolve();
	});
}

function downloadImage(keyWord, url, name, index) {
	return new Promise((resolve, reject) => {
		const fullPath = path.join(__dirname, `images-${keyWord}`, `${index}-${name}.png`);
		if (fs.existsSync(fullPath)) {
			console.log(`文件已经存在了，跳过步骤: ${name}`);
			return;
		}
		superagent.get(url).end((err, res) => {
			if (err) {
				return reject(err);
			}

			// 写文件 一般使用 二进制读写文件
			fs.writeFile(fullPath, res.body, "binary", (err) => {
				if (err) {
					return reject(err); // 下载图片失败了，但是依然有效
				}
				resolve();
			});
		});
	});
}

function request(url, accept) {
	return new Promise((resolve, reject) => {
		superagent
			.get(url)
			.set("Accept", accept)
			.set("Accept-Encoding", headers["Accept-Encoding"])
			.set("Accept-Language", headers["Accept-Language"])
			.set("Cache-Control", headers["Cache-Control"])
			.set("Connection", headers["Connection"])
			.set("sec-ch-ua", headers["sec-ch-ua"])
			.set("User-Agent", headers["User-Agent"])
			.end(async (err, res) => {
				if (err) {
					reject(`访问失败${err}`);
				} else {
					resolve(res);
				}
			});
	})
}

async function getImageByPage(start, total, word) {
	let allImages = [];

	while (start < total) {
		const size = Math.min(60, total - start); // 51 开始 总共 60 取9
		const res = await request(`https://image.baidu.com/search/acjson?word=${encodeURIComponent(word)}&tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=${encodeURIComponent(word)}&pn=${start}&rn=${size}&${Date.now()}=`, headers["Accept2"]);
		allImages = allImages.concat((JSON.parse(res.text)).data); // 需要解析 text 获取里面的 data
		start = start + size;
	}

	return allImages;
}

function runImage(keyWord, counts) {
	request(`http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1630154232805_R&pv=&ic=&nc=1&z=&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&sid=&word=${encodeURIComponent(
		keyWord
	)}`, headers["Accept"]).then(async (res) => {
		const htmlText = res.text;
		const imageUrlList = getValueListByReg(htmlText, "objURL");
		const titleList = getValueListByReg(htmlText, "fromPageTitle").map(
			(item) => item.replace("<strong>", "").replace("<\\/strong>", "")
		);

		let allImageUrls = imageUrlList.map((imgUrl, index) => ({
			imgUrl,
			title: titleList[index]
		}))

		const firstPageCount = allImageUrls.length;

		if (counts > firstPageCount) {
			const restImgUrls = await getImageByPage(firstPageCount, counts, keyWord);

			const formatImgUrls = restImgUrls.filter(item => item.middleURL).map(item => ({
				imgUrl: item.middleURL,
				title: item.fromPageTitle.replace('<strong>', '').replace('</strong>', ''),
			}))

			allImageUrls = allImageUrls.concat(formatImgUrls);
		}

		total = allImageUrls.length; // 全部的 图片数据长度

		try {
			const dirName = `images-${keyWord}`
			await mkImageDir(dirName); // 创建文件夹

			bar1.start(total, 0); // 开始进度条 从 0 开始到 30 结束

			// 遍历下载图片
			allImageUrls.forEach((item, idx) => {
				downloadImage(keyWord, item.imgUrl, item.title, idx)
					.then(() => {
						succeed++;
						bar1.update(succeed);
					})
					.then(() => {
						if (succeed === total) {
							bar1.stop();
							console.log(`恭喜下载完成`);
						}
					}).catch((err) => {
						// 下载失败 依然++
						succeed++;
						bar1.update(succeed);
					})
			});
		} catch (error) {
			console.log(error);
		}
	})
}

// runImage('猫咪', 60)

module.exports = runImage;
