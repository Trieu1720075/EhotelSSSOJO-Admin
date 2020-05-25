package elcom.ehotel.common;

import org.apache.log4j.Logger;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.bean.User;

public class ActionConstant {
	private static User user;
	private static ObjectBean bean;
	private static Logger logger;

	@SuppressWarnings("rawtypes")
	public static Logger setLogInfo(Class clazz, String info) {
		logger = Logger.getLogger(clazz);
		logger.info(info);
		return logger;
	}
	@SuppressWarnings("rawtypes")
	public static Logger setLogError(Class clazz, String error) {
		logger = Logger.getLogger(clazz);
		logger.error(error);
		return logger;
	}
	public static User getConstantUser() {
		if (user == null) {
			return new User();
		}
		return user;
	}

	public static void setConstantUser(User user) {
		ActionConstant.user = user;
	}

	public static ObjectBean getConstantBean() {
		if (bean == null) {
			return new ObjectBean();
		}
		return bean;
	}

	public static void setConstantBean(ObjectBean bean) {
		ActionConstant.bean = bean;
	}
	
	public static String getParentPath(String path){
		String parentPath = path.substring(0, path.length() - 2);
		int i = parentPath.lastIndexOf(System.getProperty("file.separator"));
		parentPath = parentPath.substring(0, i+1);
    	return parentPath;
	}
}
