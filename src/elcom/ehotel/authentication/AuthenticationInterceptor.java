package elcom.ehotel.authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.common.ApplyItemsConstant;
import elcom.ehotel.util.KeyUtils;


public class AuthenticationInterceptor implements Interceptor {
	private static final long serialVersionUID = -7211130307971104979L;
	
	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}

	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		String uri = request.getRequestURI();
		ApplyItemsConstant.KEY_PATH_PROP_FILE = ActionConstant.getParentPath(request
				.getSession().getServletContext().getRealPath("/"))
				+ ApplyItemsConstant.KEY_PATH_PROPERTIES;
		HttpSession session = request.getSession();
		String user = (String) session.getAttribute(KeyUtils.KEY_USER_ID);
        if(user == null && uri.indexOf("authentication.elcom") < 0){
            return Action.LOGIN;
        }
        return actionInvocation.invoke();
	}

}
