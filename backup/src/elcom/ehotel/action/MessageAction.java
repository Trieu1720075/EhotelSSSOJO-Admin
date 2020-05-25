package elcom.ehotel.action;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.Utils;

public class MessageAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean> {
	private ObjectBean objectBean = new ObjectBean();

	public String process() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
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

}
