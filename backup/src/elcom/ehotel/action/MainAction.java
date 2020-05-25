package elcom.ehotel.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.ReadWriteUtils;
import elcom.ehotel.util.Utils;

public class MainAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean>,
		ServletRequestAware {
	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	public File file_image;
	public File file_lag_update;

	public String process() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername()); 
		return SUCCESS;
	}
	
	public String getMyHotel(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getMyStay(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getExchangeRate(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getDining(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getDiningChildrent(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}

	public String Load_List_Main() {
		try {
			
		} catch (Exception e) {
			System.out.println(e.toString());
			return ERROR;
		}
		return SUCCESS;
	}

	public String save_main() {
		try {
			String image_name = request.getParameter("image_name") + ".jpg";
			System.out.println("vao toi ham upload file main");			
			String path_flag_source = ReadWriteUtils.getProperty("PATH_IMAGES_MAIN");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_MAIN");
			/*String filePath_flag = request.getSession().getServletContext().getRealPath("/");
			String path_flag = Utils.getParentPath(filePath_flag) + path_flag_source;*/
			String path_flag = path_flag_source+subfix;
			System.out.println("path_flag: " + path_flag);
			File file_flag = new File(path_flag);
			if (!file_flag.exists()) {
				file_flag.mkdirs();
			}
			
			Utils.createFileImage_EHotel(request, getFile_image(), image_name, path_flag, null);
			objectBean.setFileName(subfix+image_name);
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return ERROR;
		}

		return SUCCESS;
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

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public File getFile_image() {
		return file_image;
	}

	public void setFile_image(File file_image) {
		this.file_image = file_image;
	}

	public File getFile_lag_update() {
		return file_lag_update;
	}

	public void setFile_lag_update(File file_lag_update) {
		this.file_lag_update = file_lag_update;
	}

}
