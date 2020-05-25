package elcom.ehotel.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.KeyUtils;
import elcom.ehotel.util.Utils;

public class LoginAction extends ActionConstant implements ActionBasic,
		ServletRequestAware, ModelDriven<ObjectBean> {
	private HttpServletRequest request;
	private HttpSession session = null;
	private ObjectBean objectBean = new ObjectBean();

	public String login() {
		return LOGIN;
	}
	
	public String logout() throws Exception {
		session = request.getSession();
		session.removeAttribute(KeyUtils.KEY_USER_ID);
		session.removeAttribute(KeyUtils.KEY_USER_NAME);
		session.removeAttribute(KeyUtils.KEY_LANGUAGE);
		getConstantUser().setUsername(null);
		return LOGIN;
	}
	
	public String authentication() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		session.setAttribute(KeyUtils.KEY_USER_ID, objectBean.getUserId());
		session.setAttribute(KeyUtils.KEY_USER_NAME, objectBean.getUsername());
		return SUCCESS;
	}
	
	public String home() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getConfig() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
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

	/**
	 * @return the objectBean
	 */
	public ObjectBean getObjectBean() {
		return objectBean;
	}

	/**
	 * @param objectBean the objectBean to set
	 */
	public void setObjectBean(ObjectBean objectBean) {
		this.objectBean = objectBean;
	}

}
