import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip'

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    data.sign = SIGN;
    data.time = TIMESTAMP;
    console.log("data"+JSON.stringify(data));
    console.log("url:"+url);

    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
      //  header: { 'Content-Type': 'application/json' },
         header: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
    });
    tip.loaded();
    return res;
};

const wxUpload = async(params,url) => {
    tip.loading();
    console.log("wxupload---"+params);
 //   let data = params.query || {};
    // data.sign = SIGN;
    // data.time = TIMESTAMP;
    // console.log("data---wxUpload"+JSON.stringify(data));
    console.log("url---wxUpload:"+url);

    let res = await wepy.uploadFile({
        url: url,
        filePath: params,
        name: 'image',
        method: 'POST',
        header: { "Content-Type": "multipart/form-data" }

    });
    tip.loaded();
    return res;
};





module.exports = {
    wxRequest,
    wxUpload
}
