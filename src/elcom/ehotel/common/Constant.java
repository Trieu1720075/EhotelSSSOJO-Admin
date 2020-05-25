package elcom.ehotel.common;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.bean.User;

public class Constant {
	private static User user;
	private static ObjectBean bean;
	
	public static void setConstantUser(User user) {
		Constant.user = user;
	}
	public static User getConstantUser() {
		if (user == null) {
			return new User();
		}
		return user;
	}
	public static ObjectBean getConstantBean() {
		if (bean == null) {
			return new ObjectBean();
		}
		return bean;
	}
}
