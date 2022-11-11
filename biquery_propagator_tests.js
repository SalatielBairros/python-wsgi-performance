import http from 'k6/http';
import { sleep, check } from 'k6';

const req_ads = {
    method: 'POST',
    url: 'http://localhost:8990/Ads',
    body: JSON.stringify({
        file_urls: [
            "https://bdl2.blob.core.windows.net/bornlogic/facebook/ad_account/1036133846744575/ads/recurrent/2022/10/20/18a81785-0168-41bd-b2ba-42e38f1396e2-1666282984.json?sv=2021-04-10&st=2022-11-08T12%3A20%3A59Z&se=2023-11-09T12%3A20%3A00Z&sr=b&sp=r&sig=6H7t%2BmuyJGKTBGxTcu7rWtrb4GxgTlzoT%2BoOBmrUJKY%3D"
        ],
        meta_data: {
            job_creation_time: "2022-11-08T09:36:00"
        },
        company_tenant: {
            id: "5bababaa708b8413441ffa4f"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

const req_company = {
    method: 'POST',
    url: 'http://localhost:8990/GdCompanyInfo',
    body: JSON.stringify({
        file_urls: [
            "https://bdl2.blob.core.windows.net/global/internal/company_info/recurrent/2022/11/8/edc93430-3c82-4c56-9d01-3c3a8deeb3d0-1667865639.json?sv=2021-04-10&st=2022-11-09T13%3A14%3A36Z&se=2023-11-10T13%3A14%3A00Z&sr=b&sp=r&sig=R9HBxaV0s4MciSRgqyOSNOUJRkvqDuE2DYzJgouWAP8%3D"
        ],
        meta_data: {
            job_creation_time: "2022-11-08T09:36:00"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

const req_insights30d = {
    method: 'POST',
    url: 'http://localhost:8990/AdInsight30d',
    body: JSON.stringify({
        file_urls: [
            "https://bdl2.blob.core.windows.net/americanas/facebook/ad_account/1000095584122691/ads/insights/last30d/daily/2022/11/8/06242ec9-5e17-4d00-86fd-478b59fb07c2-1667877448.json?sv=2021-04-10&st=2022-11-09T13%3A19%3A56Z&se=2023-11-10T13%3A19%3A00Z&sr=b&sp=r&sig=xwI%2F1vGYenZUoJyvdK6yAeQDZT%2Bd1UlAT6nflHki8vE%3D"
        ],
        meta_data: {
            job_creation_time: "2022-11-08T09:36:00"
        },
        company_tenant: {
            id: "5ea6d0c40e82150001b22fc2"
        }
    }),
    params: {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 120000
    }
};

export const options = {
    stages: [
        { duration: '4m', target: 50 },
        { duration: '1m30s', target: 20 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    const responses = http.batch([req_ads, req_company, req_insights30d]);
    responses.forEach(res => {
        check(res, { 'status was 200': (r) => r.status == 200 });
    });

    sleep(1);
}