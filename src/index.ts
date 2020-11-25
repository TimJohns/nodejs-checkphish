import defaultAxios, { AxiosInstance } from "axios";

export const DEFAULT_API_URL = "https://developers.checkphish.ai/api";
export const DEFAULT_USER_AGENT = "CheckPhishNodeLib/1.0.0";


// TODO(tjohns): Fill in additional CheckPhishStatus fields
// TODO(tjohns): Document CheckPhishStatus fields
// TODO(tjohns): Determine if we can have an 'either-or' type here (i.e. can be a CheckPhishScanResponse or a CheckPhishScanErrorResponse)
export interface CheckPhishScanResponse {
  errorMessage?: string,
  jobID?: string
};

// TODO(tjohns): Fill in CheckPhishStatusResponse
export interface CheckPhishStatusResponse {
  errorMessage?: string,
  status?: string,
  disposition?: string,
  resolved?: boolean,
  url?: string,
  insights?: string,
  screenshot_path?: string
};

export interface CheckPhishOptions {
  apiURL?: string,
  userAgent?: string,
  axios?: AxiosInstance
}

export class CheckPhish {
  private apiKey: string;
  private apiURL: string;
  private userAgent: string;
  private axios: AxiosInstance;
  constructor(apiKey: string, options: CheckPhishOptions = {}) {
    this.apiKey = apiKey;
    this.apiURL = options.apiURL || DEFAULT_API_URL;
    this.userAgent = options.userAgent || DEFAULT_USER_AGENT;
    this.axios = options.axios || defaultAxios;
  }

  // TODO(tjohns): Add optional parameters
  async scan(url: string): Promise<CheckPhishScanResponse> {
    const axios = this.axios;
    const apiKey = this.apiKey;
    const apiURL = this.apiURL;
    const userAgent = this.userAgent;

    const { data: scanResponse }: { data: CheckPhishScanResponse}  = await axios(
      {
        method: 'post',
        url: `${apiURL}/neo/scan`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': userAgent
        },
        data: {
          apiKey,
          urlInfo: {
            url
          }
        }
      });

    if (scanResponse.errorMessage) {
      throw new Error(`Error scanning ${url}: ${scanResponse.errorMessage}`);
    } else {
      return scanResponse;
    }
  };


  // TODO(tjohns): Add optional parameters (insights, et. al.)
  async status(jobID: string, insights = true): Promise<CheckPhishStatusResponse> {
    const axios = this.axios;
    const apiKey = this.apiKey;
    const apiURL = this.apiURL;
    const userAgent = this.userAgent;

    const { data: statusResponse }: { data: CheckPhishStatusResponse}  = await axios(
      {
        method: 'post',
        url: `${apiURL}/neo/scan/status`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': userAgent
        },
        data: {
          apiKey,
          jobID,
          insights
        }
      });

    if (statusResponse.errorMessage) {
      throw new Error(`Error getting status for jobID ${jobID}: ${statusResponse.errorMessage}`);
    } else {
      return statusResponse;
    }
  }
}
