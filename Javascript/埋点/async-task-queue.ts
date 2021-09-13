// import { debounce } from 'lodash';

function debounce (fn, delay) {

}

interface RequiredData {
    timestamp: number
}

// 将 异步执行的上报 放在 localStorage 中
class TaskQueueStorableHelper<T extends RequiredData = any> {
    // 保证是单例模式
    public static getInstance<T extends RequiredData = any>() {
        if (!this.instance) {
            this.instance = new TaskQueueStorableHelper<T>(); // 使用是同一个 instance
        }
        return this.instance;
    }
    private static instance: TaskQueueStorableHelper | null = null

    protected store: any = null;
    private STORAGE_KEY = "my_store"


    constructor() {
        const localStorageValue = localStorage.getItem(this.STORAGE_KEY)
        if (localStorageValue) {
            this.store = JSON.parse(localStorageValue);
        }
    }

    get queueData() {
        return this.store?.queueData || [];
    }

    set queueData(queueData: T[]) {
        this.store = {
            ...this.store,
            queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
        };

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
    }
}

export abstract  class AsyncTaskQueue <T extends RequiredData= any> {
    private  get storableService() {
        return TaskQueueStorableHelper.getInstance<T>();
    }

    private get queueData() {
        return this.storableService.queueData
    }

    protected debounceRun = debounce(this.run.bind((this), 1000))

    private set queueData(value: T[]) {
        this.storableService.queueData = value;

        if (value.length) {
            // 上报 直接上报
            this.debounceRun();
        }
    }

    // 消费任务队列
    protected abstract consumeTaskQueue(data: T[]): Promise<any>;

    // 将代码 推动队列中
    protected addTask(data: T | T[]) {
        this.queueData = this.queueData.concat(data);
    }

    // 上报
    private run() {
        // 如果严谨的做法，通过 每一个 task id 重新给队列赋值
        const currentDataList = this.queueData;

        if (currentDataList.length) {
            // 当前这批数据上报完成，需要 从 queueData 里面 剔除
            this.queueData = [];
            this.consumeTaskQueue(currentDataList).catch(_ => {}); // 重试
        }
    }
}