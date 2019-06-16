import extension from 'extensionizer';

// TODO: think about rewrite class into collection of functions

export class ExtensionPlatform {
  //
  // Public
  //
  static reload() {
    extension.runtime.reload();
  }

  static openWindow({ url }) {
    extension.tabs.create({ url });
  }

  static openSettings() {
    extension.runtime.openOptionsPage();
  }

  static closeCurrentWindow() {
    return extension.windows.getCurrent(windowDetails => (
      extension.windows.remove(windowDetails.id)
    ));
  }

  static getVersion() {
    return extension.runtime.getManifest().version;
  }

  // openExtensionInBrowser (route = null, queryString = null) {
  //   let extensionURL = extension.runtime.getURL('content.html')

  //   if (queryString) {
  //     extensionURL += `?${queryString}`
  //   }

  //   if (route) {
  //     extensionURL += `#${route}`
  //   }
  //   this.openWindow({ url: extensionURL })
  // }

  static getPlatformInfo(cb) {
    try {
      extension.runtime.getPlatformInfo((platform) => {
        cb(null, platform);
      });
    } catch (e) {
      cb(e);
    }
  }

  static addMessageListener(cb) {
    extension.runtime.onMessage.addListener(cb);
  }

  static sendMessage(message, query = {}) {
    const { id } = query;
    delete query.id;
    extension.tabs.query({ ...query }, (tabs) => {
      tabs.forEach((tab) => {
        extension.tabs.sendMessage(id || tab.id, message);
      });
    });
  }

  // _showNotification (title, message, url) {
  //   extension.notifications.create(
  //     url,
  //     {
  //     'type': 'basic',
  //     'title': title,
  //     'iconUrl': extension.extension.getURL('../../images/icon-64.png'),
  //     'message': message,
  //     })
  // }

  _subscribeToNotificationClicked() {
    if (!extension.notifications.onClicked.hasListener(this._viewOnEtherScan)) {
      extension.notifications.onClicked.addListener(this._viewOnEtherScan);
    }
  }
}
