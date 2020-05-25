package elcom.ehotel.filter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.common.ApplyItemsConstant;


public class FilterAction implements Interceptor {
	private static final long serialVersionUID = -7211130307971104979L;
	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	@SuppressWarnings("unused")
	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		String uri = request.getRequestURI();
		ApplyItemsConstant.KEY_PATH_PROP_FILE = ActionConstant.getParentPath(request
				.getSession().getServletContext().getRealPath("/"))
				+ ApplyItemsConstant.KEY_PATH_PROPERTIES;
        Map<String, Object> session = actionInvocation.getInvocationContext().getSession();
//        if(session.get(ApplyItemsConstant.KEY_USER) == null && uri.indexOf("authentication.elcom") < 0){
//            return Action.LOGIN;
//        } else {
//    		User user = (User) session.get(ApplyItemsConstant.KEY_USER);
//    		ActionConstant.setConstantUser(user);
//        }
        return actionInvocation.invoke();
	}

}
