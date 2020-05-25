package elcom.ehotel.common;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.rmi.Naming;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import ehotel.core.FTPGatewayInterface;
import ehotel.core.FTPServerStruct;
import elc.dangtm.main.Permisson;
import elcom.ehotel.bean.FileModel;
import elcom.ehotel.bean.ObjectBean;

public class UploadFile {
	public static String getParentPath(String path) {
		String parentPath = path.substring(0, path.length() - 2);
		int i = parentPath.lastIndexOf(System.getProperty("file.separator"));
		parentPath = parentPath.substring(0, i + 1);
		return parentPath;
	}

	public static String convertUTF8(String value) {
		String result = "";
		byte[] bytes = value.getBytes(StandardCharsets.ISO_8859_1);
		result = new String(bytes, StandardCharsets.UTF_8);
		return result;
	}

	public static void createFile(File file, String fileName, String imagePath, String oldFileName) {
		try {
			// create folder
	        Path folder = Paths.get(imagePath);
	        if (!Files.exists(folder)) {
	            try {
	                Files.createDirectories(folder);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	        
			// delete old file
			if (oldFileName != null && !"".equals(oldFileName)) {
				File oldFile = new File(imagePath + "/" + oldFileName);
				oldFile.delete();
			}
			
			// create new file
			String path = imagePath + "/" + fileName;
			File newFile = new File(path);
			FileInputStream in = new FileInputStream(file);
			FileOutputStream out = new FileOutputStream(newFile);
			int line = 0;
			while ((line = in.read()) != -1) {
				out.write(line);
			}
			in.close();
			out.close();
			System.out.println("Permission");			
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void createFileCrop(ObjectBean objectBean, String fileName,
			String imagePath, String extention) {
		try {
			// create folder
	        Path folder = Paths.get(imagePath);
	        if (!Files.exists(folder)) {
	            try {
	                Files.createDirectories(folder);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	        
			// delete old file
			if (objectBean.getOldFileName()!= null && !"".equals(objectBean.getOldFileName())) {
				File oldFile = new File(imagePath + "/" + objectBean.getOldFileName());
				oldFile.delete();
			}
			
			// create new file crop
			String path = imagePath + "/" + fileName;
			File newFile = new File(path);
			BufferedImage outImage = ImageIO.read(objectBean.getFile());
			BufferedImage cropImage = outImage.getSubimage(objectBean.getCropX(),
					objectBean.getCropY(), objectBean.getCropW(), objectBean.getCropH());
			ImageIO.write(cropImage, extention, newFile);
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getDurationMedia(String filename) throws Exception {
		String localfile = "";
		String info = null;
		String[] listCmd = new String[] { "/bin/bash", "-c",
				"ffmpeg -i " + localfile + filename + " 2>&1 | grep 'Duration'" };
		Runtime run = Runtime.getRuntime();
		Process runtimeProcess = null;
		String duration = "00:00:00";
		try {
			runtimeProcess = run.exec(listCmd);
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(
					runtimeProcess.getInputStream()));
			while ((info = bufferedReader.readLine()) != null) {
				String text = "Duration";
				duration = info.substring(info.indexOf(text) + text.length() + 2, info.indexOf("."));
			}
			run.freeMemory();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return duration;
	}

	public static String getExtention(String fileName) {
		String[] array = fileName.split(Pattern.quote("."));
		return array[array.length - 1];
	}

	public static String createFileName(String fileName, String name) {
		String result = "";
		Date date = new Date();
		Timestamp currentTimestamp = new Timestamp(date.getTime());
		result = name + "_" + currentTimestamp.getTime() + "." + getExtention(fileName);
		return result;
	}

	public static String transferFile(ObjectBean obj, String hostServer, String pathServer, String mediaName) {
		String result = null;
		try {
			// create folder
	        Path folder = Paths.get(pathServer);
	        if (!Files.exists(folder)) {
	            try {
	                Files.createDirectories(folder);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
			// cau hinh rmi
			FTPGatewayInterface FTP = (FTPGatewayInterface) Naming.lookup("rmi://" + hostServer
					+ ":2099/elc_ftpgateway");
			String path = "";
			if (obj.getMediaPath().equals("") || obj.getMediaPath() == null) {
				path = obj.getMediaName();
			} else {
				path = obj.getMediaPath() + "/" + obj.getMediaName();
			}
			// down load file from src to server
			FTPServerStruct server = new FTPServerStruct(obj.getHost(), obj.getPort(),
					obj.getUser(), obj.getPass(), path.trim());
			UUID id = FTP.download(server, hostServer, pathServer + "/" + mediaName, 5000);
			if (id != null) {
				result = id.toString();
			}
		} catch (Exception e) {
			result = null;
			e.printStackTrace();
		}
		return result;
	}

	public static String getFileFTP(String path, String host, String user, String pass, int port) {
		Ftp4jClient ftp = new Ftp4jClient(host, port, user, pass);
		ftp.connect();
		List<String> listFolder = ftp.getListFolder(path);
		List<FileModel> listFile = ftp.getListFile(path);
		ftp.close();
		for (int i = 0; i < listFolder.size(); i++) {
			for (int j = 0; j < listFile.size(); j++) {
				if (listFile.get(j).equals(listFolder.get(i))) {
					listFile.remove(j);
					j--;
				}
			}
		}
		for (int i = 0; i < listFolder.size(); i++) {
			if (listFolder.get(i).equals(".") || listFolder.get(i).equals("..")) {
				listFolder.remove(i);
				i--;
			}
		}

		String mData = "";
		mData += "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" standalone=\"yes\" ?>\n";
		mData += "<xml>";
		for (int i = 0; i < listFolder.size(); i++) {
			mData += "<Item>";
			mData += "<name>";
			mData += listFolder.get(i);
			mData += "</name>";
			mData += "<type>";
			mData += "1";
			mData += "</type>";
			mData += "</Item>";
		}
		for (int i = 0; i < listFile.size(); i++) {
			mData += "<Item>";
			mData += "<name>";
			mData += listFile.get(i).getFilename();
			mData += "</name>";
			mData += "<type>";
			mData += "0";
			mData += "</type>";
			mData += "</Item>";
		}
		mData += "</xml>";
		return mData;
	}
}
