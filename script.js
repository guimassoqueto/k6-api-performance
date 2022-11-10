import http from "k6/http";
import { check, group } from "k6";
import { Rate } from "k6/metrics";

import { INVOICES_API_GET, INVOICES_API_POST } from "./urls.js";
import invoicesPostBody from "./helpers/invoicesPostBody.js";

/*
export const options = {
  vus: 1000,
  duration: '20s',
};
*/
const errorRate = new Rate('errorRate');

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '20s', target: 1000 },
  ],
  thresholds: {
    errorRate: [
      { threshold: 'rate < 0.05', abortOnFail: true, delayAbortEval: '1s' },
    ],
  },
}

export default function () {
    group('Invoices API post', function () {
        let res = http.post(INVOICES_API_POST, JSON.stringify(invoicesPostBody()));
        check(res, { "status is 201": (r) => r.status === 201 });
        errorRate.add(res.status != 201);
    });
}
