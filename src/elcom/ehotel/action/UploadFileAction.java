package elcom.ehotel.action;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.Date;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ModelDriven;

import elc.dangtm.main.Permisson;
import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.common.UploadFile;
import elcom.ehotel.util.ReadWriteUtils;

public class UploadFileAction extends ActionConstant implements ActionBasic,
		ModelDriven<ObjectBean> {
	private ObjectBean objectBean = new ObjectBean();

	public String uploadFile() {
		try {
			String fileName = "";
			if (objectBean.getOldFileName() == null || objectBean.getOldFileName().equals("")) {
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Hotel");
			} else if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			} else {
				// String name =
				// objectBean.getOldFileName().split(Pattern.quote("."))[0];
				// String extention =
				// UploadFileAction.getExtention(objectBean.getFileName());
				// fileName = name + "." + extention;
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Hotel");
			}

			if (objectBean.getFile() != null) {
				String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
				// String filePath_ =
				// request.getSession().getServletContext().getRealPath("/");
				// String path_logo = Utils.getParentPath(filePath_)+ filePath;
				String path_logo = filePath;
				System.out.println("path upload file :" + path_logo);
				File file_logo = new File(path_logo);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}

				UploadFileAction.createFile(objectBean.getFile(), fileName, path_logo);
			}

			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}

	public String upload_file_main() {
		try {
			HttpServletRequest request = ServletActionContext.getRequest();
			String fileName = "";
			 String subfix =
			 ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_MAIN");
			String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
			if (objectBean.getOldFileName() == null || objectBean.getOldFileName().equals("")) {
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Main");
			} else if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			} else {
				// String name =
				// objectBean.getOldFileName().split(Pattern.quote("."))[0];
				// String extention =
				// UploadFileAction.getExtention(objectBean.getFileName());
				// fileName = name + "." + extention;
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Main");
			}
			if (objectBean.getFile() != null) {
				// String filePath_ = request.getSession().getServletContext().getRealPath("/");
				// String path_logo = Utils.getParentPath(filePath_)+ filePath;
				String path_logo = filePath;
				System.out.println("path upload file :" + path_logo+subfix);
				File file_logo = new File(path_logo+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}

				//UploadFileAction.createFile(objectBean.getFile(), fileName, path_logo);
				System.out.println("path_file_main: "+path_logo);
				String extention = UploadFile.getExtention(objectBean.getFileName());
				UploadFileAction.createFileCrop(objectBean, fileName, path_logo, extention);
			}

			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	
	
	/*public String upload_file_main() { //cho nay la lam cho local chay
		try {
			HttpServletRequest request = ServletActionContext.getRequest();
			String fileName = "";
			// String subfix =
			// ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_MAIN");
			String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
			if (objectBean.getOldFileName() == null || objectBean.getOldFileName().equals("")) {
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Main");
			} else if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			} else {
				// String name =
				// objectBean.getOldFileName().split(Pattern.quote("."))[0];
				// String extention =
				// UploadFileAction.getExtention(objectBean.getFileName());
				// fileName = name + "." + extention;
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Main");
			}
			if (objectBean.getFile() != null) {
				 String filePath_ = request.getSession().getServletContext().getRealPath("/");
				 String path_logo = Utils.getParentPath(filePath_)+ filePath;
				//String path_logo = filePath;
				System.out.println("path upload file :" + path_logo);
				File file_logo = new File(path_logo);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}

				//UploadFileAction.createFile(objectBean.getFile(), fileName, path_logo);
				String extention = UploadFile.getExtention(objectBean.getFileName());
				UploadFileAction.createFileCrop(objectBean, fileName, path_logo, extention);
			}

			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	*/
	public String upload_file_exchange(){
		try{
			HttpServletRequest request = ServletActionContext.getRequest();
			//String filePath_ =	request.getSession().getServletContext().getRealPath("/");
			String fileName = "";
			String fileNameImage = "";
			String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_EXCHANGE");
			
			if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			}else if(objectBean.getFile() != null){			
				
				// String path_exchange = Utils.getParentPath(filePath_)+ filePath;
				
				String path_exchange = filePath;
				System.out.println("path upload icon exchange file :" + path_exchange);
				File file_logo = new File(path_exchange+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Exchange");
				String extention = UploadFile.getExtention(objectBean.getFileName());
				//UploadFileAction.createFileCrop(objectBean, fileName, filePath, extention);
				UploadFileAction.createFile(objectBean.getFile(), fileName, path_exchange);
			}
			
			if (objectBean.getFile_image() == null) {
				fileNameImage = objectBean.getOldFileNameImage();
			}else if(objectBean.getFile_image() != null){
				
				// String path_exchange = Utils.getParentPath(filePath_)+ filePath;
				
				String path_exchange = filePath;
				System.out.println("path upload image exchange file :" + path_exchange);
				File file_logo = new File(path_exchange+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}
				fileNameImage = UploadFileAction.createFileName(objectBean.getFileNameImage(), "Exchange");
				UploadFileAction.createFile(objectBean.getFile_image(), fileNameImage, path_exchange);
			}
			
			
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
			objectBean.setFileNameImage(fileNameImage);
		}catch(Exception ex){
			objectBean.setStatus("ERROR");
		}
		
		return SUCCESS;
	}

	
	public String upload_file_prmotion(){
		try{
			HttpServletRequest request = ServletActionContext.getRequest();
			//String filePath_ =	request.getSession().getServletContext().getRealPath("/");
			String fileName = "";
			String fileNamePromotion = "";
			String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_PROMOTION");
			
			if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			}else if(objectBean.getFile() != null){			
				
				// String path_exchange = Utils.getParentPath(filePath_)+ filePath;
				
				String path_exchange = filePath;
				System.out.println("path upload icon promotion file :" + path_exchange);
				File file_logo = new File(path_exchange+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Promotion");
				String extention = UploadFile.getExtention(objectBean.getFileName());
				//UploadFileAction.createFileCrop(objectBean, fileName, filePath, extention);
				UploadFileAction.createFile(objectBean.getFile(), fileName, path_exchange);
			}
			
			if (objectBean.getFilePromotion() == null) {
				fileNamePromotion = objectBean.getOldFileNamePromotion();
			}else if(objectBean.getFilePromotion() != null){
				
				 //String path_exchange = Utils.getParentPath(filePath_)+ filePath;
				
				String path_exchange = filePath;
				System.out.println("path upload image promotion file :" + path_exchange);
				File file_logo = new File(path_exchange+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}
				fileNamePromotion = UploadFileAction.createFileName(objectBean.getFileNamePromotion(), "Promotion");
				UploadFileAction.createFile(objectBean.getFilePromotion(), fileNamePromotion, path_exchange);
			}
			
			
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
			objectBean.setFileNamePromotion(fileNamePromotion);
		}catch(Exception ex){
			objectBean.setStatus("ERROR");
		}
		
		return SUCCESS;
	}
	
	public String upload_file_dining_icon() {
		try {
			HttpServletRequest request = ServletActionContext.getRequest();
			String fileName = "";
			 String subfix =
			 ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_DINING");
			String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
			if (objectBean.getOldFileName() == null || objectBean.getOldFileName().equals("")) {
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Dining");
			} else if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			} else {				
				fileName = UploadFileAction.createFileName(objectBean.getFileName(), "Dining");
			}
			if (objectBean.getFile() != null) {
				/* String filePath_ = request.getSession().getServletContext().getRealPath("/");
				 String path_logo = Utils.getParentPath(filePath_)+ filePath;*/
				String path_logo = filePath;
				System.out.println("path upload file :" + path_logo+subfix);
				File file_logo = new File(path_logo+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}

				//UploadFileAction.createFile(objectBean.getFile(), fileName, path_logo);
				System.out.println("path_file_main: "+path_logo);
				UploadFileAction.createFile(objectBean.getFile(), fileName, path_logo);
				//String extention = UploadFile.getExtention(objectBean.getFileName());
				//UploadFileAction.createFileCrop(objectBean, fileName, path_logo, extention);
			}

			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	
	public String upload_file_dining() {
		try {
			HttpServletRequest request = ServletActionContext.getRequest();
			String fileName = "";
			if (objectBean.getOldFileNameDining() == null || objectBean.getOldFileNameDining().equals("")) {
				fileName = UploadFileAction.createFileName(objectBean.getFileNameDining(), "Dining");
			} else if (objectBean.getFileDining() == null) {
				fileName = objectBean.getOldFileNameDining();
			} else {				
				fileName = UploadFileAction.createFileName(objectBean.getFileNameDining(), "Dining");
			}

			if (objectBean.getFileDining() != null) {
				String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_DINING");
				String filePath = ReadWriteUtils.getProperty("PATH_IMAGE");
				 /* String filePath_ =
				request.getSession().getServletContext().getRealPath("/");
				 String path_logo = Utils.getParentPath(filePath_)+ filePath;*/
				String path_logo = filePath;
				System.out.println("path upload file :" + path_logo+subfix);
				File file_logo = new File(path_logo+subfix);
				if (!file_logo.exists()) {
					file_logo.mkdirs();
				}

				UploadFileAction.createFile(objectBean.getFileDining(), fileName, path_logo);
			}

			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	
	public static String createFileName(String fileName, String name) {
		String result = "";
		Date date = new Date();
		Timestamp currentTimestamp = new Timestamp(date.getTime());
		result = "/" + name + "/" + currentTimestamp.getTime() + "." + getExtention(fileName);
		// result = + currentTimestamp.getTime() + "." + getExtention(fileName);
		return result;
	}

	public static String getExtention(String fileName) {
		String[] array = fileName.split(Pattern.quote("."));
		return array[array.length - 1];
	}

	public static void createFile(File file, String fileName, String imagePath) {
		String path = imagePath + "/" + fileName;

		try {
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
			BufferedImage cropImage = outImage.getSubimage(objectBean.getCropX(),objectBean.getCropY(), objectBean.getCropW(), objectBean.getCropH());
			ImageIO.write(cropImage, extention, newFile);
			
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public ObjectBean getModel() {
		setConstantBean(objectBean);
		return getConstantBean();
	}

	public ObjectBean getObjectBean() {
		return objectBean;
	}

	public void setObjectBean(ObjectBean objectBean) {
		this.objectBean = objectBean;
	}
	
	

}
