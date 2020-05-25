package elcom.ehotel.action;

import com.opensymphony.xwork2.ActionSupport;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.util.Utils;

public class MusicVideoAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
	private ObjectBean objectBean = new ObjectBean();

	public String getMusicVideo(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
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
