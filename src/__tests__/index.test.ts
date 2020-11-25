import { CheckPhish } from '../index';
import { AxiosInstance } from "axios";

const fakeAPIKey = "Not really an API key";

describe('with defaults', () => {
  describe('scan', () => {
    test('uses the full default URL', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const defaultOptions = { axios };
      const checkphish = new CheckPhish(fakeAPIKey, defaultOptions);
      const scanResponse = {
        data: {}
      };

      mockAxios.mockResolvedValue(scanResponse);

      await checkphish.scan('https://example.com');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.url).toEqual('https://developers.checkphish.ai/api/neo/scan');

    });
    test('has the package.json version in the default UA string', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const defaultOptions = { axios };
      const checkphish = new CheckPhish(fakeAPIKey, defaultOptions);
      const scanResponse = {
        data: {}
      };
      const { version } = require('root-require')('./package.json');

      mockAxios.mockResolvedValue(scanResponse);

      await checkphish.scan('https://example.com');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.headers['User-Agent']).toEqual(expect.stringContaining('/' + version));

    });
  });
  describe('status', () => {
    test('uses the full default URL', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const defaultOptions = { axios };
      const checkphish = new CheckPhish(fakeAPIKey, defaultOptions);
      const statusResponse = {
        data: {}
      };

      mockAxios.mockResolvedValue(statusResponse);

      await checkphish.status('jobID');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.url).toEqual('https://developers.checkphish.ai/api/neo/scan/status');

    });
  });
});

describe('with options', () => {
  describe('scan', () => {
    test('uses the specified root URL', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const options = {
        axios,
        apiURL: "https://tenant.bolster.ai"
      };
      const checkphish = new CheckPhish(fakeAPIKey, options);
      const scanResponse = {
        data: {}
      };

      mockAxios.mockResolvedValue(scanResponse);

      await checkphish.scan('https://example.com');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.url).toEqual('https://tenant.bolster.ai/neo/scan');

    });
    test('uses the specified UA string', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const options = {
        axios,
        userAgent: "Just some jest tests."
      };
      const checkphish = new CheckPhish(fakeAPIKey, options);
      const scanResponse = {
        data: {}
      };

      mockAxios.mockResolvedValue(scanResponse);

      await checkphish.scan('https://example.com');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.headers['User-Agent']).toEqual("Just some jest tests.");

    });

  });
  describe('status', () => {
    test('uses the specified root URL', async () => {
      const mockAxios = jest.fn();
      const axios = mockAxios as unknown as AxiosInstance;
      const options = {
        axios,
        apiURL: "https://tenant.bolster.ai"
      };
      const checkphish = new CheckPhish(fakeAPIKey, options);
      const statusResponse = {
        data: {}
      };

      mockAxios.mockResolvedValue(statusResponse);

      await checkphish.status('jobID');

      const axiosArgs = mockAxios.mock.calls[0][0];

      expect(axiosArgs.url).toEqual('https://tenant.bolster.ai/neo/scan/status');

    });
  });

});

// TODO(tjohns): Test scan with axios throw
// TODO(tjohns): Test scan with error response
// TODO(tjohns): Test status with axios throw
// TODO(tjohns): Test status with error response

