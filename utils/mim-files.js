function getType(file) {
  const extention = file.split(".").slice(-1)[0];
  switch (extention) {
    case "ai":
    case "bmp":
    case "gif":
    case "ico":
    case "jpeg":
    case "JPEG":
    case "jpg":
    case "JPG":
    case "png":
    case "PNG":
    case "ps":
    case "psd":
    case "svg":
    case "tiff":
    case "tif":
    case "jfif":
      return "image";
    case "htm":
    case "html":
      return "html";
    case "txt":
    case "rtf":
    case "rwpd":
    case "odt":
    case "csv":
      return "text";
    case "doc":
    case "docx":
    case "pptx":
    case "ppt":
    case "xls":
    case "xlsx":
      return "office";
    case "pdf":
    case "PDF":
      return "pdf";
    case "gdoc":
      return "gdocs";
    case "3g2":
    case "3gp":
    case "avi":
    case "h264":
    case "m4v":
    case "mkv":
    case "mov":
    case "mp4":
    case "mpg":
    case "mpeg":
    case "rm":
    case "vob":
    case "wmv":
    case "flv":
    case "swf":
    case "MP4":
      return "video";
    case "aif":
    case "cda":
    case "mid":
    case "midi":
    case "mp3":
    case "mpa":
    case "ogg":
    case "wav":
    case "wma":
    case "wpl":
      return "audio";
    default:
      return "other";
  }
}

module.exports = getType;
