package elcom.ehotel.bean;

import java.util.List;
import java.io.File;

public class ObjectBean {
	private String data;
	private String status;

	private List<Language> listLanguages;
	private String userId;
	private String username;
	private String type;
	private String oldFileName;
	private String fileName;
	private String mediaName;
	private File file;
	private String filePath;
	private String mediaPath;
	private int cropX;
	private int cropY;
	private int cropW;
	private int cropH;
	private String languageId;
	private String host;
	private int port;
	private String user;
	private String pass;
	private String result;

	private Object_Welcome object_welcome;
	private ObjectMain objectmain;
	private List<ObjectMain> listObjectMain;
	
	private String name_logo;
	private String name_logo_small;
	
	private File file_image;
	private String oldFileNameImage;
	private String fileNameImage;
	
	private File filePromotion;
	private String oldFileNamePromotion;
	private String fileNamePromotion;
	
	private File fileDining;
	private String oldFileNameDining;
	private String fileNameDining;
	
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Language> getListLanguages() {
		return listLanguages;
	}

	public void setListLanguages(List<Language> listLanguages) {
		this.listLanguages = listLanguages;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the oldFileName
	 */
	public String getOldFileName() {
		return oldFileName;
	}

	/**
	 * @param oldFileName
	 *            the oldFileName to set
	 */
	public void setOldFileName(String oldFileName) {
		this.oldFileName = oldFileName;
	}

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName
	 *            the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the file
	 */
	public File getFile() {
		return file;
	}

	/**
	 * @param file
	 *            the file to set
	 */
	public void setFile(File file) {
		this.file = file;
	}

	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}

	/**
	 * @param filePath
	 *            the filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Object_Welcome getObject_welcome() {
		return object_welcome;
	}

	public void setObject_welcome(Object_Welcome object_welcome) {
		this.object_welcome = object_welcome;
	}

	public ObjectMain getObjectmain() {
		return objectmain;
	}

	public void setObjectmain(ObjectMain objectmain) {
		this.objectmain = objectmain;
	}

	public List<ObjectMain> getListObjectMain() {
		return listObjectMain;
	}

	public void setListObjectMain(List<ObjectMain> listObjectMain) {
		this.listObjectMain = listObjectMain;
	}

	/**
	 * @return the cropX
	 */
	public int getCropX() {
		return cropX;
	}

	/**
	 * @param cropX
	 *            the cropX to set
	 */
	public void setCropX(int cropX) {
		this.cropX = cropX;
	}

	/**
	 * @return the cropY
	 */
	public int getCropY() {
		return cropY;
	}

	/**
	 * @param cropY
	 *            the cropY to set
	 */
	public void setCropY(int cropY) {
		this.cropY = cropY;
	}

	/**
	 * @return the cropW
	 */
	public int getCropW() {
		return cropW;
	}

	/**
	 * @param cropW
	 *            the cropW to set
	 */
	public void setCropW(int cropW) {
		this.cropW = cropW;
	}

	/**
	 * @return the cropH
	 */
	public int getCropH() {
		return cropH;
	}

	/**
	 * @param cropH
	 *            the cropH to set
	 */
	public void setCropH(int cropH) {
		this.cropH = cropH;
	}

	/**
	 * @return the languageId
	 */
	public String getLanguageId() {
		return languageId;
	}

	/**
	 * @param languageId
	 *            the languageId to set
	 */
	public void setLanguageId(String languageId) {
		this.languageId = languageId;
	}

	/**
	 * @return the host
	 */
	public String getHost() {
		return host;
	}

	/**
	 * @param host
	 *            the host to set
	 */
	public void setHost(String host) {
		this.host = host;
	}

	/**
	 * @return the port
	 */
	public int getPort() {
		return port;
	}

	/**
	 * @param port
	 *            the port to set
	 */
	public void setPort(int port) {
		this.port = port;
	}

	/**
	 * @return the user
	 */
	public String getUser() {
		return user;
	}

	/**
	 * @param user
	 *            the user to set
	 */
	public void setUser(String user) {
		this.user = user;
	}

	/**
	 * @return the pass
	 */
	public String getPass() {
		return pass;
	}

	/**
	 * @param pass
	 *            the pass to set
	 */
	public void setPass(String pass) {
		this.pass = pass;
	}

	/**
	 * @return the mediaName
	 */
	public String getMediaName() {
		return mediaName;
	}

	/**
	 * @param mediaName
	 *            the mediaName to set
	 */
	public void setMediaName(String mediaName) {
		this.mediaName = mediaName;
	}

	/**
	 * @return the mediaPath
	 */
	public String getMediaPath() {
		return mediaPath;
	}

	/**
	 * @param mediaPath
	 *            the mediaPath to set
	 */
	public void setMediaPath(String mediaPath) {
		this.mediaPath = mediaPath;
	}

	/**
	 * @return the result
	 */
	public String getResult() {
		return result;
	}

	/**
	 * @param result
	 *            the result to set
	 */
	public void setResult(String result) {
		this.result = result;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	public String getName_logo() {
		return name_logo;
	}

	public void setName_logo(String name_logo) {
		this.name_logo = name_logo;
	}

	public String getName_logo_small() {
		return name_logo_small;
	}

	public void setName_logo_small(String name_logo_small) {
		this.name_logo_small = name_logo_small;
	}


	public String getOldFileNameImage() {
		return oldFileNameImage;
	}

	public void setOldFileNameImage(String oldFileNameImage) {
		this.oldFileNameImage = oldFileNameImage;
	}

	public String getFileNameImage() {
		return fileNameImage;
	}

	public void setFileNameImage(String fileNameImage) {
		this.fileNameImage = fileNameImage;
	}

	public File getFile_image() {
		return file_image;
	}

	public void setFile_image(File file_image) {
		this.file_image = file_image;
	}

	public File getFilePromotion() {
		return filePromotion;
	}

	public void setFilePromotion(File filePromotion) {
		this.filePromotion = filePromotion;
	}

	public String getOldFileNamePromotion() {
		return oldFileNamePromotion;
	}

	public void setOldFileNamePromotion(String oldFileNamePromotion) {
		this.oldFileNamePromotion = oldFileNamePromotion;
	}

	public String getFileNamePromotion() {
		return fileNamePromotion;
	}

	public void setFileNamePromotion(String fileNamePromotion) {
		this.fileNamePromotion = fileNamePromotion;
	}

	public File getFileDining() {
		return fileDining;
	}

	public void setFileDining(File fileDining) {
		this.fileDining = fileDining;
	}

	public String getOldFileNameDining() {
		return oldFileNameDining;
	}

	public void setOldFileNameDining(String oldFileNameDining) {
		this.oldFileNameDining = oldFileNameDining;
	}

	public String getFileNameDining() {
		return fileNameDining;
	}

	public void setFileNameDining(String fileNameDining) {
		this.fileNameDining = fileNameDining;
	}

	
}
