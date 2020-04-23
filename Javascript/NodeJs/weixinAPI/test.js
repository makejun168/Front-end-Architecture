const newFileList = [];

info.fileList.forEach(value => {
    const {status, result} = value.response;
    if (status === 0) {
        result.item.forEach(v => {
            newFileList.push({});
        })
    } else {
        MessageChannel.error('失败');
    }
});

const state = info.fileList.every(value => {
    const {status, result} = value.response;
    if (status === 0) {
        result.item.forEach(v => {
            newFileList.push({});
        });
    }
    return status === 0;
});

if (!state) {
    MessageChannel.error('失败');
}