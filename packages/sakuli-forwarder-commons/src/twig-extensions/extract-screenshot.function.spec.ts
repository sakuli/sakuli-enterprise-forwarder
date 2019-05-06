import { extractScreenshot } from "./extract-screenshot.function";
import { join } from "path";

describe('extract-screenshot-function', () => {

    const Base64String = "iVBORw0KGgoAAAANSUhEUgAAAE4AAAAQCAIAAAA3TN7NAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRT" +
    "b2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAABPdJREFUSInllX9MU1cUx89997YIVGgV2bIh" +
    "AwXJWBSxAwRECuPHQAGVkMkQM4W5AYpMxR/RwRSjcYrBwVRANjEiDAY4lOAQg4zfY7gtGDPZ1HT8" +
    "UIHSlgJiLO3+eOxSaAvG4bJk39w05577Oefec997p+jW3U74f4ioVGoAaG2qetT1YFracoH9Ykf3" +
    "l3+qlyIyqlIBoEddD/x93rW1tZsClUj68gvz7B3cANRai0iXUxvQxKYNmSL8BWKBKEdVrMPW1s43" +
    "ImOKiBv58QCgHB197j3+WyIq9VipXC4XAFydFqkmEgyACqC5pZ2dUl5bneIHOafTbv/aijFxcvXY" +
    "HLtdMMfsJZ1bU0Gewis1rdNijFoNajUAgFKpBACGYIIxxpgQzBBMCAME9/YP0gCW1x6PH3bvS/jI" +
    "2W1lbnFldn6Zg9A5Oz1VHzyzY4pTaQ4GIUAIAEClUgEAYjAiDEMwwgzGGGHyZ1f/4/5hWirLa4/8" +
    "3Kygde8FhIQaGRvNNjHxCQjanXyUXVIMyD/dGRPq55q0K3ZQIWedwSLh1ZKCyDU+G9f6/lhfU/bt" +
    "pQ0h3pFrfBpqqijQ+MON8NWi3XEfyKQS6qQ7snawSAgAwSIhOx0eUhzaGx/q55qcGPdkeJCSdTcr" +
    "mUlPGROMMcEY9fYPi7v629ofDo6MEg6hd6FPt5obvf1X61zKzfzCQej8TXnNEse3L2SPt4O+nsdZ" +
    "ly5Hxe04nrL/XvtvZy+Wbvp4+7kvT1Kg7ZfW3OIK15Xe58+e0rcv++peqWlljdzMdBd3UWFFbWBI" +
    "2MWcMxSTS6UMgxgGjRfMYKZPNtT2R0+v7MnQUxUmHEww4eBxADE6x4BcajbPXOdSS2PtqpAwA4NZ" +
    "gSFhzXU1dMeo2E94PBMPL7+nI08S9n5maioQ+QZKensosDE6ztDQ2H/V2p+a6qmTpqW2prOp7uYK" +
    "kQ+XwxW6uDXWVlNgqdCZoImXdPteDwBgwmEbNAJQT+zsk3gq3myTAalUMFdHH5LLpMbGPATA4/Hk" +
    "MhnNwBpcDgcAOISwtlqtpgCPN5v9HVQoJkVNsqkhl8nCg7zGngqDqf8Nq4WEQWNTtgP3irv01DIm" +
    "yk+Sg6NTbXXlmrAI7SUTU/6QYsCUL1AoFKZ8Ps2gmUqnPTI8bGRsrFAMCObMpc5RpZLD4Tx79kyT" +
    "pIYpn3++sNzAYJb2sQn8DXV0dFzP2zpFkd3d3QAAekp9f9OWPfEfmvAF7p7vPB0Zaait/rmlad/B" +
    "YwCw3N2zrKRgfWT0d8X5Lu6e4xk0U+my8y9kb4iKuXa1dPmKsah55q9WXbvi4eWblZFKSasFNp0d" +
    "YgtLKwBw9/T5/urlgODQ3+/eqSgr3rk/heYkCCEAmG/9ZlFJwRR1srKxFyI9pVovXHTo8/ScM6fS" +
    "jh3kcg3cPLxiEvaw8OaYhCNJiev83d5a4rg/5QTNoJlKp21jZx8e7G29cFHy0TTWuWXbrvQTh/O+" +
    "ztyWeKCy/DLrPHA4NSlxq5n5K8czvoqOTUg9kpR9+qSZmXlkVKzmXqjlTodc2ldfXbpje6JSqRSL" +
    "xRYWFprN9v79++xfro2NTea500udRK/Nt532Uv65fN0WX29om8GEBCGory5dHxbBvp+GhoYSiUST" +
    "EAgErCGXy9eHRRQU5b1u+W+UCnq/lRcUYRi0zMWroCjvOQOWuXgxzIweQb9mdqO/AAbcJzu9/py2" +
    "AAAAAElFTkSuQmCC";

    it('should create a screenshot html snippet', () => {
        const html = extractScreenshot.callable({
            screenshot: join(__dirname, '__mocks__', 'computer.png')
        });
        expect(html).toContain(Base64String);
        expect(html).toContain('data:image/png;');
    })

})