const {
  getAllAnalyticsFunction,
} = require("../helper/database/analytics.helper");
const { getAllUrlFunction } = require("../helper/database/url.helper");

module.exports.getAnalyticsByAlias = async (request, response, next) => {
  try {
    const { alias } = request.params;

    const analytics = await getAllAnalyticsFunction({ alias });

    if (analytics.length == 0) {
      return response.status(404).json({
        status: false,
        message: "No analytics found",
        data: null,
      });
    }

    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    let osType = [];
    let deviceType = [];
    let clicksByDate = [];

    for (let ele of analytics) {
      const os = ele.os;
      const exist = osType.find((item) => item.osName == os);
      if (exist) {
        exist.uniqueClicks += 1;
        exist.uniqueUsers.add(ele.ipAddress);
      } else {
        osType.push({
          osName: os,
          uniqueClicks: 1,
          uniqueUsers: new Set([ele.ipAddress]),
        });
      }

      const device = ele.deviceType || "unknown";
      const existDevice = deviceType.find((item) => item.deviceName == device);
      if (existDevice) {
        existDevice.uniqueClicks += 1;
        existDevice.uniqueUsers.add(ele.ipAddress);
      } else {
        deviceType.push({
          deviceName: device,
          uniqueClicks: 1,
          uniqueUsers: new Set([ele.ipAddress]),
        });
      }

      const date = ele.date;
      const existDate = clicksByDate.find((item) => item.date == date);
      if (existDate) {
        existDate.clicks += 1;
      } else {
        clicksByDate.push({ date: date, clicks: 1 });
      }
    }

    osType.forEach((item) => (item.uniqueUsers = item.uniqueUsers.size));
    deviceType.forEach((item) => (item.uniqueUsers = item.uniqueUsers.size));

    return response.status(200).json({
      status: true,
      message: "Analatics get",
      data: { totalClicks, uniqueUsers, clicksByDate, osType, deviceType },
    });
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: analytics.controller.js:72 ~ module.exports.getAnalyticsByAlias= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};

module.exports.getAnalyticsByTopic = async (request, response, next) => {
  try {
    const { topic } = request.params;

    const getUrls = await getAllUrlFunction({ topic });

    if (getUrls.length == 0) {
      return response.status(404).json({
        status: false,
        message: "No urls found for this topic",
        data: null,
      });
    }

    const shortUrls = getUrls.map((u) => u.shortUrl);

    const analytics = await getAllAnalyticsFunction({
      shortUrl: { $in: shortUrls },
    });

    if (analytics.length == 0) {
      return response.status(404).json({
        status: false,
        message: "No analytics found",
        data: null,
      });
    }

    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    let clicksByDate = [];
    let urls = [];

    for (let ele of analytics) {
      const shortUrl = ele?.shortUrl;

      const existUrl = urls.find((item) => item.shortUrl == shortUrl);
      if (existUrl) {
        existUrl.totalClicks += 1;
        existUrl.uniqueUsers.add(ele.ipAddress);
      } else {
        urls.push({
          shortUrl: shortUrl,
          totalClicks: 1,
          uniqueUsers: new Set([ele.ipAddress]),
        });
      }

      const date = ele.date;
      const existDate = clicksByDate.find((item) => item.date == date);
      if (existDate) {
        existDate.clicks += 1;
      } else {
        clicksByDate.push({ date: date, clicks: 1 });
      }
    }

    urls.forEach((item) => (item.uniqueUsers = item.uniqueUsers.size));

    return response.status(200).json({
      status: true,
      message: "Analatics get",
      data: {
        totalClicks,
        uniqueUsers,
        clicksByDate,
        urls,
      },
    });
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: analytics.controller.js:156 ~ module.exports.getAnalyticsByTopic= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};

module.exports.getAnalytics = async (request, response, next) => {
  try {
    const getUrls = await getAllUrlFunction({});

    if (getUrls.length == 0) {
      return response.status(404).json({
        status: false,
        message: "No urls found",
        data: null,
      });
    }

    const shortUrls = getUrls.map((u) => u.shortUrl);

    const analytics = await getAllAnalyticsFunction({
      shortUrl: { $in: shortUrls },
    });

    if (analytics.length == 0) {
      return response.status(404).json({
        status: false,
        message: "No analytics found",
        data: null,
      });
    }

    const totalUrls = getUrls.length;
    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    let osType = [];
    let deviceType = [];
    let clicksByDate = [];

    for (let ele of analytics) {
      const os = ele.os;
      const exist = osType.find((item) => item.osName == os);
      if (exist) {
        exist.uniqueClicks += 1;
        exist.uniqueUsers.add(ele.ipAddress);
      } else {
        osType.push({
          osName: os,
          uniqueClicks: 1,
          uniqueUsers: new Set([ele.ipAddress]),
        });
      }

      const device = ele.deviceType || "unknown";
      const existDevice = deviceType.find((item) => item.deviceName == device);
      if (existDevice) {
        existDevice.uniqueClicks += 1;
        existDevice.uniqueUsers.add(ele.ipAddress);
      } else {
        deviceType.push({
          deviceName: device,
          uniqueClicks: 1,
          uniqueUsers: new Set([ele.ipAddress]),
        });
      }

      const date = ele.date;
      const existDate = clicksByDate.find((item) => item.date == date);
      if (existDate) {
        existDate.clicks += 1;
      } else {
        clicksByDate.push({ date: date, clicks: 1 });
      }
    }

    osType.forEach((item) => (item.uniqueUsers = item.uniqueUsers.size));
    deviceType.forEach((item) => (item.uniqueUsers = item.uniqueUsers.size));

    return response.status(200).json({
      status: true,
      message: "Analatics get",
      data: {
        totalUrls,
        totalClicks,
        uniqueUsers,
        clicksByDate,
        osType,
        deviceType,
      },
    });
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: analytics.controller.js:253 ~ module.exports.getAnalyticsByTopic= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};
