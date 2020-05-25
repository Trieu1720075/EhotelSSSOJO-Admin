package elcom.ehotel.common;

import it.sauronsoftware.ftp4j.FTPClient;
import it.sauronsoftware.ftp4j.FTPFile;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import elcom.ehotel.bean.FileModel;

public class Ftp4jClient {
	private String host = "";
	private int port = 21;
	private String user = "";
	private String pass = "";
	private FTPClient client = new FTPClient();
	private static List<String> listFolder;
	private static List<FileModel> listFile;
	private final static Logger logger = Logger.getLogger(Ftp4jClient.class);

	public Ftp4jClient(String host, int port, String user, String pass) {
		super();
		this.host = host;
		this.port = port;
		this.user = user;
		this.pass = pass;
		listFolder = new ArrayList<String>();
		listFile = new ArrayList<FileModel>();
	}

	public void connect() {
		try {
			logger.info("Connect ftp server " + this.host);
			client.connect(this.host, this.port);
			client.login(user, pass);
			logger.info("Connect ftp server " + this.host + " success");
		} catch (Exception e) {
			logger.error("Connect ftp error", e);
		}
	}

	public boolean deleteFile(String filepath) {
		logger.info("Delete file in ftp server " + filepath);
		boolean flag = true;
		try {
			client.deleteFile(filepath);
		} catch (Exception e) {
			logger.error("Delete file " + filepath + " error", e);
			flag = false;
		}
		return flag;
	}

	public boolean deleteFolder(String folderpath) {
		logger.info("Delete folder in ftp server " + folderpath);
		boolean flag = true;
		try {
			client.deleteDirectory(folderpath);
		} catch (Exception e) {
			logger.error("Delete folder " + folderpath + " error", e);
			flag = false;
		}
		return flag;
	}

	public boolean createDirectoryFtp(String foldername) {
		boolean flag = true;
		logger.info("create folder: " + foldername);
		try {
			client.createDirectory(foldername);
		} catch (Exception e) {
			logger.error("Create folder " + foldername + " error", e);
		}
		return flag;
	}

	public void close() {
		try {
			// logger.info("Disconnect ftp server " + this.host);
			client.disconnect(false);
		} catch (Exception e) {
			logger.error("Disconnect ftp server " + this.host + " error", e);
		}
	}

	public void getFolder(String path) {
		try {
			FTPFile[] arr = client.list(path);
			for (int i = 0; i < arr.length; i++) {
				if (arr[i].getType() == 1 && !arr[i].getName().equalsIgnoreCase("ftp_client")
						&& !arr[i].getName().equalsIgnoreCase("ftp_gateway") && !arr[i].getName().equalsIgnoreCase("KillJavaProgram")) {
					String temp = path + "/" + arr[i].getName();
					listFolder.add(temp);
					getFolder(path + "/" + arr[i].getName());
				}
			}
		} catch (Exception e) {
			logger.error("Get list folder " + path + " error", e);
		}
	}

	public void getFile(String path) {
		try {
			if (!path.equalsIgnoreCase("")) {
				String text = path.substring(0, 1);
				if (text.equalsIgnoreCase("/"))
					path = path.substring(1, path.length());
			}
			FTPFile[] arr = client.list(path);
			for (int i = 0; i < arr.length; i++) {
				if (arr[i].getType() == 0) {
					if (path.indexOf("ftp_client") < 0 && path.indexOf("ftp_gateway") < 0 && path.indexOf("KillJavaProgram") < 0) {
						FileModel temp = new FileModel();
						temp.setFilename(path + "/" + arr[i].getName());
						temp.setSize(arr[i].getSize());
						listFile.add(temp);
					}
				}
				if (arr[i].getType() == 1) {
					getFile(path + "/" + arr[i].getName());
				}
			}
		} catch (Exception e) {
			logger.error("Get list file " + path + " error", e);
		}
	}

	public List<String> getListFolder(String path) {
		listFolder = new ArrayList<String>();
		getFolder(path);
		return listFolder;
	}

	public List<FileModel> getListFile(String path) {
		listFile = new ArrayList<FileModel>();
		getFile(path);
		return listFile;
	}

}
