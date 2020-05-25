package elcom.ehotel.util;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import elc.dangtm.main.Permisson;

public class Utils {
	public static String getProperty(String code) {
		String value = "";
		String pathProperties=System.getProperty("catalina.home")+"/webapps"+KeyUtils.PATH_PROPERTIES_FILE;		
		//String pathProperties="/webapps"+KeyUtils.PATH_PROPERTIES_FILE;		
		Properties properties = new Properties();
		try {	
	/*		properties.load(Utils.class.getResourceAsStream(KeyUtils.PATH_PROPERTIES_FILE));			
			value = properties.getProperty(code);*/
			properties.load(new FileInputStream(pathProperties));
			value = properties.getProperty(code);
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return value;
	}
	public static String getParentPath(String path) {
		String parentPath = path.substring(0, path.length() - 2);
		int i = parentPath.lastIndexOf(System.getProperty("file.separator"));
		parentPath = parentPath.substring(0, i + 1);
		return parentPath;
	}
	
	public static void createFileImage_EHotel(HttpServletRequest request, File file, String fileName,
			String imagePath, String oldPath) {
		
		/*String filePath = request.getSession().getServletContext().getRealPath("/");
		String path_folder = getParentPath(filePath) + imagePath;
		String path = getParentPath(filePath) + imagePath + fileName;		*/
		
		String path_folder =  imagePath;
		String path = imagePath + fileName;
		System.out.println("--------------path------------: "+path);
		File file2 = new File(path_folder);
	    if (!file2.exists()) {	    	
	    	file2.mkdirs();
	    }	
		// remove file exist
		if (oldPath != null && !oldPath.equals("")) {
			//File serverFile = new File(filePath + oldPath);
			File serverFile = new File(oldPath);
			if (serverFile.exists() && !serverFile.isDirectory()) {
				serverFile.delete();
			}
		}
		
		// create new file
		try {
			File newFile = new File(path);
			FileInputStream in = new FileInputStream(file);
			FileOutputStream out = new FileOutputStream(newFile);
			int line = 0;
			while ((line = in.read()) != -1) {
				out.write(line);
			}
			
			
			in.close();
			out.close();
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String getLanguageId() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		int idLanguage = 0;
		String code = request.getParameter("request_locale");
		if (code != null && !"".equals(code)) {
			if (code.equals("vn")) {
				idLanguage = 1;
			} else {
				idLanguage = 2;
			}
		} else {
			String param = (String) session.getAttribute(KeyUtils.KEY_LANGUAGE);
			if (param != null && !"".equals(param)) {
				idLanguage = Integer.parseInt(param);
				return idLanguage + "";
			} else {
				String strIdLanguage = (String) session.getAttribute(KeyUtils.KEY_LANGUAGE);
				if (strIdLanguage != null) {
					idLanguage = Integer.parseInt(strIdLanguage);
				} else {
					idLanguage = 2;
				}
				idLanguage = 2;
			}
		}
		session.setAttribute(KeyUtils.KEY_LANGUAGE, idLanguage + "");

		return idLanguage + "";
	}
	
	public static String getUsername() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute(KeyUtils.KEY_USER_NAME);
		if (username == null) {
			return "";
		}
		return username;
	}
	
}
