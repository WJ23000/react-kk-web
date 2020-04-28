const href = window.location.href;

let baseUrl="";
if (/(\.test\.)/.test(href)) {
    baseUrl = '';
} else if (/localhost|\.dev\.|((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(href)) {
    baseUrl = 'https://mock.yonyoucloud.com/mock/6105';
} else {
    baseUrl = '';
};

export default baseUrl;