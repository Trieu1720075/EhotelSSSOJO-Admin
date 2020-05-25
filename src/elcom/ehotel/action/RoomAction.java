package elcom.ehotel.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.Utils;

public class RoomAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean>,
ServletRequestAware {
	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	
	public String process() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername()); 
		return SUCCESS;
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


	@Override
	public ObjectBean getModel() {
		setConstantBean(objectBean);
		return getConstantBean();
	}


}
