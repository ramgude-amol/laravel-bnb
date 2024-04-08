export default function response() {
    const is404 = function (err) {
        return isErrorWithResponseAndStatus(err) && 404 === err.response.status;
    };

    const is422 = function (err) {
        return isErrorWithResponseAndStatus(err) && 422 === err.response.status;
    };

    const isErrorWithResponseAndStatus = function (err) {
        return err.response && err.response.status;
    };

    return { is404, is422 }
}