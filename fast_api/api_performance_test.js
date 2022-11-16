import http from 'k6/http';
import { sleep, check } from 'k6';

const req_first = {
    method: 'POST',
    url: 'http://localhost:8991/first',
    body: JSON.stringify({
        info: {
            sequence: "first"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

const req_second = {
    method: 'POST',
    url: 'http://localhost:8991/second',
    body: JSON.stringify({
        info: {
            sequence: "second"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

const req_third = {
    method: 'POST',
    url: 'http://localhost:8991/third',
    body: JSON.stringify({
        info: {
            sequence: "third"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

// export const options = {
//     stages: [
//         { duration: '1m', target: 20 },
//         { duration: '5m', target: 300 },
//         { duration: '1m30s', target: 20 },
//         { duration: '1m', target: 0 },
//     ],
// };

export const options = {
    vus: 500,
    duration: '5m',
};

export default function () {
    const responses = http.batch([req_first, req_second, req_third]);
    responses.forEach(res => {
        check(res, { 'status was 200': (r) => r.status == 200 });
    });

    sleep(1);
}