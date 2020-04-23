const { resolve } = require('path');

exports.reply = async (ctx, next) => {
    const message = ctx.weixin;
    const mp = require('./index');
    const client = mp.getWechat();
    // console.log(client);
    let reply = '';
    if (message.MsgType === 'image') {
        console.log('message', message);
        console.log(message.PicUrl);
    } else if (message.MsgType === 'event') {
        const {Event} = message;
        if (Event === 'subscribe') {
            reply = `欢迎订阅 !扫码参数${message.EventKey} ${message.ticket}`;
        } else if (Event === 'unsubscribe') {
            reply = `取消订阅`;
        } else if (Event === 'SCAN') {
            reply = `关注后扫二维码 扫码参数${message.EventKey} ${message.ticket}`;
        } else if (Event === 'LOCATION') {
            reply = `你上报的地理位置是${message.Label}`;
        } else if (Event === 'CLICK') {
            reply = `你点击了菜单的：${message.EventKey}`;
        } else if (Event === 'VIEW') {
            reply = `你点击了菜单的链接：${message.EventKey}`;
        } else if (Event === 'scancode_push') {
            console.log(`你扫码了${message.ScanCodeInfo}${message.ScanResult}`);
        } else if (Event === 'scancode_waitmsg') {
            console.log(`你扫码中${message.ScanCodeInfo}${message.ScanResult}`);
        } else if (Event === 'pic_sysphoto') {
            console.log(`系统拍照${message.SendPicsInfo.Count}${JSON.stringify(message.SendPicsInfo.PicList)}`);
        } else if (Event === 'pic_photo_or_album') {
            console.log(`拍照或者相册${JSON.stringify(message.SendPicsInfo.PicList)}`);
        } else if (Event === 'pic_weixin') {
            console.log(`微信相册发图${message.SendPicsInfo.Count}${JSON.stringify(message.SendPicsInfo.PicList)}`);
        } else if (Event === 'location_select') {
            console.log(`地理位置${JSON.stringify(message.SendLocationInfo)}`);
        }
        ctx.body = reply;
    } else if (message.MsgType === 'text') {
        let content = message.Content;
        reply = 'Oh, 你说的' + content + '...';

        if (content === '1') {
            reply = '天下第一';
        } else if (content === '2') {
            reply = '天下第二';
        } else if (content === '3') {
            reply = '天下第三';
        } else if (content === 'test') {
            reply = '测试';
        } else if (content === '4') {
            const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../2.jpg'));
            console.log(data);
            reply = {
                type: 'image',
                mediaId: data.media_id
            };
        } else if (content === '5') {
            const data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../6.mp4'));
            reply = {
                type: 'video',
                title: '回复的视频标题',
                description: '回复的视频描述内容',
                mediaId: data.media_id
            };
        } else if (content === '6') {
            // 图文详情
            const data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../6.mp4'), {
                type: 'video',
                description: '{"title": "这个地方很棒", "introduction": "好吃不如饺子"}'
            });
        
            reply = {
                type: 'video',
                title: '回复的视频标题 2',
                description: '打个篮球玩玩',
                mediaId: data.media_id
            };
        } else if (content === '7') {
            // 返回也是本地的图片
            const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../2.jpg'), {
                type: 'image'
            });
        
            reply = {
                type: 'image',
                mediaId: data.media_id
            }
        } else if (content === '8') {
            const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../2.jpg'), {
                type: 'image'
            });
            const data2 = await client.handle('uploadMaterial', 'pic', resolve(__dirname, '../2.jpg'), {
                type: 'image'
            });
            console.log(data2);
        
            let media = {
                articles: [
                    {
                        title: '这是服务端上传的图文 1',
                        thumb_media_id: data.media_id,
                        author: 'Scott',
                        digest: '没有摘要',
                        show_cover_pic: 1,
                        content: '点击去往慕课网',
                        content_source_url: 'http://coding.imooc.com/'
                    },
                    {
                        title: '这是服务端上传的图文 2',
                        thumb_media_id: data.media_id,
                        author: 'Scott',
                        digest: '没有摘要',
                        show_cover_pic: 1,
                        content: '点击去往 github',
                        content_source_url: 'http://github.com/'
                    }
                ]
            }
        
            const uploadData = await client.handle('uploadMaterial', 'news', media, {});
    
            let newMedia = {
                media_id: uploadData.media_id,
                index: 0,
                articles: {
                    title: '这是服务端上传的图文 1',
                    thumb_media_id: data.media_id,
                    author: 'Scott',
                    digest: '没有摘要',
                    show_cover_pic: 1,
                    content: '点击去往慕课网',
                    content_source_url: 'http://coding.imooc.com/'
                }
            }
        
            console.log(uploadData);
        
            const mediaData = await client.handle('updateMaterial', uploadData.media_id, newMedia)
    
            console.log(mediaData);
    
            const newsData = await client.handle('fetchMaterial', uploadData.media_id, 'news', true)
            const items = newsData.news_item;
            const news = [];
    
            items.forEach(item => {
                news.push({
                    title: item.title,
                    description: item.description,
                    picUrl: data2.url,
                    url: item.url
                })
            });
    
            reply = news;
        } else if (content === '9') {
            // 获取素材的总数
            const counts = await client.handle('countMaterial');
            console.log(JSON.stringify(counts));

            const res = await Promise.all([
                client.handle('batchMaterial', {
                    type: 'image',
                    offset: 0,
                    count: 10
                }),
                client.handle('batchMaterial', {
                    type: 'video',
                    offset: 0,
                    count: 10
                }),
                client.handle('batchMaterial', {
                    type: 'voice',
                    offset: 0,
                    count: 10
                }),
                client.handle('batchMaterial', {
                    type: 'news',
                    offset: 0,
                    count: 10
                })
            ]);
            console.log(res);
            reply = `
                image: ${res[0].total_count}
                video: ${res[1].total_count}
                voice: ${res[2].total_count}
                news: ${res[3].total_count}
            `
        } else if (content === '10') {
            // 创建标签
            let newTag = await client.handle('createTag', 'poloma');
            console.log(newTag);
            // 删除标签
            // await client.handle('delTag', 100)
            // 编辑标签
            // await client.handle('updateTag', 101, '慕课网')
            // 批量打标签/取消标签
            // await client.handle('batchTag', [message.FromUserName], 101, true)
            // 获取某个标签的用户列表
            // let userList = await client.handle('fetchTagUsers', 2);
            // console.log(userList);
            // 获取公众号的标签列表
            // let tagsData = await client.handle('fetchTags')
            // 获取某个用户的标签列表
            // let userTags = await client.handle('getUserTags', message.FromUserName)
            reply = tagsData.tags.length;
        } else if (content === '11') {
            // 获取所有的关注者
            const userList = await client.handle('fetchUserList');
            console.log(userList);
            reply = userList.total + ' 个关注者';
        } else if (content === '12') {
            await client.handle('remarkUser', message.FromUserName, 'poloma');
            reply = '改名成功';
        } else if (content === '13') {
            // 获取用户信息数据
            const userInfoData = await client.handle('getUserInfo', message.FromUserName);

            console.log(userInfoData);

            reply = JSON.stringify(userInfoData);
        } else if (content === '14') {
            const batchUsersInfo = await client.handle('fetchBatchUsers', [{
                openid: message.FromUserName,
                lang: 'zh_CN'
            }, {
                openid: 'oxmdn6JelJspBlK0To4YaetXMVkc',
                lang: 'zh_CN'
            }]);

            console.log(batchUsersInfo);
            reply = JSON.stringify(batchUsersInfo);
        } else if (content === '15') {
            // 生成公众号的临时二维码
            const temQr = {
                expire_seconds: 400000,
                action_name: 'QR_STR_SCENE',
                action_info: {
                    scene: {
                        scene_id: 101
                    }
                }
            }
            // 生成公众号的永久二维码
            // const qrData = {
            //     action_name: 'QR_STR_SCENE',
            //     action_info: {
            //         scene: {
            //             scene_id: 99
            //         }
            //     }
            // }

            const tempTicketData = await client.handle('createQrcode', temQr);

            const temQrCode = await client.showQrCode(tempTicketData.ticket);
            reply = temQrCode;
        } else if (content === '16') {
            // 长链接转化为短链接
            // 长链接转短链接接口
            const longUrl = 'https://baidu.com?a=1';
            const shortData = await client.handle('createShortUrl', 'long2short', longUrl);
            console.log('shortData');
            // reply = shortData;
            reply = shortData.short_url;
        } else if (content === '17') {
            // 语音查询
            const semanticData = {
                query: "查一下明天从北京到上海的南航机票",
                city: "北京",
                category: "flight,hotel",
                uid: message.FromUserName
            }
            const searchData = await client.handle('semantic', semanticData);
            console.log('searchData', searchData);
            // reply = shortData;
            reply = JSON.stringify(searchData);
        } else if (content === '18') {
            // 语音查询
            const body = '编程语音难学吗?';
            const translateData = await client.handle('aiTranslate', body, 'zh_CN', 'en_US');
            // console.log('translateData', translateData);
            // reply = shortData;
            reply = JSON.stringify(translateData);
        } else if (content === '19') {
            await client.handle('deleteMenu');
            let menu = {
                button: [
                    {
                        name: '一级菜单1',
                        sub_button: [
                            {
                                name: '二级菜单1',
                                type: 'click',
                                key: 'no_1'
                            },
                            {
                                name: '二级菜单2',
                                type: 'click',
                                key: 'no_2'
                            },
                        ]
                    },
                    {
                        name: '一级菜单2',
                        type: 'view',
                        url: 'http://www.baidu.com'
                    },
                    {
                        name: '新菜单' + Math.random(),
                        type: 'click',
                        key: '19'
                    }
                ]
            }
            await client.handle('createMenu', menu);
            reply = '菜单创建成功了， 先取消关注，再重新关注';
        } else if (content === '20') {
            // await client.handle('deleteMenu');
            let menu = {
                button: [
                    {
                        name: '发图',
                        sub_button: [
                            {
                                name: '系统拍照',
                                type: 'pic_sysphoto',
                                key: 'no_1'
                            },
                            {
                                name: '拍照或者发图',
                                type: 'pic_photo_or_album',
                                key: 'no_2'
                            },
                            {
                                name: '微信相册发图',
                                type: 'pic_weixin',
                                key: 'no_4'
                            },
                            {
                                name: '发图扫码',
                                type: 'scancode_push',
                                key: 'no_5'
                            },
                            {
                                name: '等待中扫码',
                                type: 'scancode_waitmsg',
                                key: 'no_6'
                            }
                        ]
                    },
                    {
                        name: '测试查询电影网站',
                        type: 'view',
                        url: 'http://makejun888.free.idcfengye.com/sdk'
                    },
                    {
                        name: '其他',
                        sub_button: [
                            {
                                name: '点击',
                                type: 'click',
                                key: 'no_11'
                            },
                            {
                                name: '地理位置',
                                type: 'location_select',
                                key: 'no_12'
                            }
                        ],
                        key: 'no_10'
                    }
                ]
            }
            let rules = {
                // "tag_id": "2", 
                // "sex": "1",
                // "country": "瓦鲁瓦图",
                // "province": "广东", 
                // "city": "广州", 
                // "client_platform_type": "2", 
                "language": "zh_CN"
            }
            await client.handle('createMenu', menu, rules);
            let menuData = await client.handle('fetchMenu');
            console.log(JSON.stringify(menuData));
            reply = '菜单创建成功了， 先取消关注，再重新关注';
        }
        ctx.body = reply;
    }

    await next();
}
