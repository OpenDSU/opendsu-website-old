function doDownload(url, expectedResultType, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      response[expectedResultType]().then((data) => {
        return callback(undefined, data);
      }).catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      return callback(err);
    });
}

function doUpload(url, data, callback) {

  fetch(url, {
    method: 'POST',
    body: data
  }).then((response) => {
    return response.json().then((data) => {
      if (!response.ok || response.status != 201) {
        let errorMessage = '';
        if (Array.isArray(data) && data.length) {
          errorMessage = `${data[0].error.message}. Code: ${data[0].error.code}`;
        } else if (typeof data === 'object') {
          errorMessage = data.message ? data.message : JSON.stringify(data);
        }

        let error = new Error(errorMessage);
        error.data = data;
        throw error;
      }

      if (Array.isArray(data)) {
        let responses = [];
        for (const item of data) {
          console.log(`Uploaded ${item.file.name} to ${item.result.path}`);
          responses.push(item.result.path);
        }
        callback(undefined, responses.length > 1 ? responses : responses[0]);
      }
    });
  }).catch((err) => {
    return callback(err);
  });
}

function doFileUpload(path, files, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  const formData = new FormData();
  let inputType = "file";

  if (Array.isArray(files)) {
    for (const attachment of files) {
      inputType = "files[]";
      formData.append(inputType, attachment);
    }
  } else {
    formData.append(inputType, files);
  }

  let url = `/upload?path=${path}&input=${inputType}`;
  if (typeof options !== "undefined" && options.preventOverwrite) {
    url += "&preventOverwrite=true";
  }
  doUpload(url, formData, callback);
}

function doRemoveFile(url, callback) {
  fetch(url, {method: "DELETE"})
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      callback();
    })
    .catch((err) => {
      return callback(err);
    });
}


function performFilesRemoval(filePathList, callback) {

  let errors = [];
  let deletedFiles = []

  let deleteFile = (path) => {
    let filename = path;
    if (path[0] !== "/") {
      path = "/" + path;
    }
    let url = "/delete" + path;
    doRemoveFile(url, (err) => {

      if (err) {
        console.log(err);
        errors.push({
          filename: filename,
          message: err.message
        });
      } else {
        deletedFiles.push(filename);
      }

      if (filePathList.length > 0) {
        return deleteFile(filePathList.shift())
      }
      callback(errors.length ? errors : undefined, deletedFiles);
    });
  }

  deleteFile(filePathList.shift())
}

class DSUStorage {

  setObject(path, data, callback) {
    try {
      let dataSerialized = JSON.stringify(data);
      this.setItem(path, dataSerialized, callback);
    } catch (e) {
      callback(e);
    }
  }

  getObject(path, callback) {
    this.getItem(path, "json", callback)
  }

  setItem(path, data, callback) {
    let segments = path.split("/");
    let fileName = segments.splice(segments.length - 1, 1)[0];
    path = segments.join("/");
    if (!path) {
      path = "/";
    }
    let url = `/upload?path=${path}&filename=${fileName}`;
    doUpload(url, data, callback);
  }

  getItem(url, expectedResultType, callback) {
    if (typeof expectedResultType === "function") {
      callback = expectedResultType;
      expectedResultType = "arrayBuffer";
    }

    if (url[0] !== "/") {
      url = "/" + url;
    }

    url = "/download" + url;
    doDownload(url, expectedResultType, callback);
  }

  uploadFile(path, file, options, callback) {
    doFileUpload(...arguments);
  }

  uploadMultipleFiles(path, files, options, callback) {
    doFileUpload(...arguments);
  }

  removeFile(filePath, callback) {
    performFilesRemoval([filePath], callback);
  }

  removeFiles(filePathList, callback) {
    performFilesRemoval(...arguments);
  }
}

export default DSUStorage;
