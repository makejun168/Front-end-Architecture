import {AsyncTaskQueue} from "./async-task-queue";
import axios from 'axios';

interface TrackData {
    seqId: number,
    id: number,
    timestamp: number,
}

interface UserTrackData {
    msg?: string;
}

export class BaseTrack extends AsyncTaskQueue<TrackData>{
    private seq: number = 0;

    // 这里加了 一层配置 处理用户的信息
    public track(data: UserTrackData) {
        this.addTask({
            id: uuid(),
            seqId: this.seq++, // 为了保证数据准确性
            timestamp: Date.now(),
        })
    }


    public consumeTaskQueue(data: any): Promise<any> {
        // 上报图片请求
        // return new Promise((resolve, reject) => {
        //     const image = new Image()
        //     image.src = `https://baidu.com?${stringfy(data)}`
        // })

        return axios.post(`https://baidu.com`, data);
    }
}

export const baseTrack = new BaseTrack();

