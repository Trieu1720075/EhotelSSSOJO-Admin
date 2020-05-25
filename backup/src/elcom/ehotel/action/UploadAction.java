package elcom.ehotel.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.common.UploadFile;
import elcom.ehotel.util.ReadWriteUtils;

public class UploadAction extends ActionConstant implements ActionBasic,
		ServletRequestAware, ModelDriven<ObjectBean> {
	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;

	public String uploadFile() {
		try {
			String fileName = "";
			if (objectBean.getFile() == null) {
				fileName = objectBean.getOldFileName();
			} else {
				fileName = UploadFile.createFileName(objectBean.getFileName(), "image");
			}

			if (objectBean.getFile() != null) {
				String filePath = ""; 
				if (objectBean.getType().equals("1")) {
					filePath = ReadWriteUtils.getProperty("PATH_LIVE_TV");
				} else if (objectBean.getType().equals("2")) {
					filePath = ReadWriteUtils.getProperty("PATH_VIDEO");
				} else {
					filePath = ReadWriteUtils.getProperty("PATH_MUSIC");
				}
				UploadFile.createFile(objectBean.getFile(), fileName, filePath, objectBean.getOldFileName());
			}
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	
	public String uploadFileCrop() {
		try {
			String fileName = "";
			if (objectBean.getFile() != null) {
				fileName = UploadFile.createFileName(objectBean.getFileName(), "image");
				String filePath = ReadWriteUtils.getProperty("PATH_LIVE_TV");
				String extention = UploadFile.getExtention(objectBean.getFileName());
				UploadFile.createFileCrop(objectBean, fileName, filePath, extention);
			} else {
				fileName = objectBean.getOldFileName();
			}
			
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}

		return SUCCESS;
	}
	
	public String uploadFileVideo() {
		try {
			if (objectBean.getType().equals("1")) {
				String hostServer = request.getServerName();
				String mediaName = UploadFile.createFileName(objectBean.getMediaName(), "video");
				String pathServer = ReadWriteUtils.getProperty("SOURCE_VIDEO");
				String result = UploadFile.transferFile(objectBean, hostServer, pathServer, mediaName);
				if (result != null) {
					objectBean.setResult(result);
					objectBean.setMediaName(mediaName);
				} else {
					objectBean.setStatus("ERROR");
					return SUCCESS;
				}
			}
			
			String fileName = "";
			if (objectBean.getFile() != null) {
				fileName = UploadFile.createFileName(objectBean.getFileName(), "image");
				String filePath = ReadWriteUtils.getProperty("PATH_VIDEO");
				String extention = UploadFile.getExtention(objectBean.getFileName());
				UploadFile.createFileCrop(objectBean, fileName, filePath, extention);
			} else {
				fileName = objectBean.getOldFileName();
			}
			
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}
		
		return SUCCESS;
	}
	
	public String uploadFileAudio() {
		try {
			if (objectBean.getType().equals("1")) {
				String hostServer = request.getServerName();
				String mediaName = UploadFile.createFileName(objectBean.getMediaName(), "audio");
				String pathServer = ReadWriteUtils.getProperty("SOURCE_MUSIC");
				String result = UploadFile.transferFile(objectBean, hostServer, pathServer, mediaName);
				if (result != null) {
					objectBean.setResult(result);
					objectBean.setMediaName(mediaName);
				} else {
					objectBean.setStatus("SUCCESS");
					return SUCCESS;
				}
			}
			objectBean.setStatus("SUCCESS");
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}
		
		return SUCCESS;
	}
	
	public String uploadFileMyHotel() {
		try {
			if (objectBean.getType().equals("1")) {
				String hostServer = request.getServerName();
				String mediaName = UploadFile.createFileName(objectBean.getMediaName(), "video");
				String pathServer = ReadWriteUtils.getProperty("SOURCE_MY_HOTEL");
				String result = UploadFile.transferFile(objectBean, hostServer, pathServer, mediaName);
				if (result != null) {
					objectBean.setResult(result);
					objectBean.setMediaName(mediaName);
				} else {
					objectBean.setStatus("ERROR");
					return SUCCESS;
				}
			}
			
			String fileName = "";
			if (objectBean.getFile() != null) {
				fileName = UploadFile.createFileName(objectBean.getFileName(), "image");
				String filePath = ReadWriteUtils.getProperty("PATH_LIVE_TV");
				String extention = UploadFile.getExtention(objectBean.getFileName());
				UploadFile.createFileCrop(objectBean, fileName, filePath, extention);
			} else {
				fileName = objectBean.getOldFileName();
			}
			
			objectBean.setStatus("SUCCESS");
			objectBean.setFileName(fileName);
		} catch (Exception e) {
			objectBean.setStatus("ERROR");
		}
		
		return SUCCESS;
	}

	@Override
	public ObjectBean getModel() {
		setConstantBean(objectBean);
		return getConstantBean();
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
}
