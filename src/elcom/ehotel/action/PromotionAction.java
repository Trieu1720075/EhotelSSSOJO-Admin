package elcom.ehotel.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.opensymphony.xwork2.ModelDriven;

import elc.dangtm.main.Permisson;
import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.ReadWriteUtils;
import elcom.ehotel.util.Utils;

public class PromotionAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean>,
ServletRequestAware {

	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	public String file_data;
	private String path_file_html = "";
	public String process() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername()); 
		return SUCCESS;
	}
	
	public String createfile(){
		boolean istrue = true;
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		String file_name = request.getParameter("file_name");
	//	String code = request.getParameter("code");
		
		// String filePath = request.getSession().getServletContext().getRealPath("/");		//nho rang lai 
		// String path = Utils.getParentPath(filePath)+ path_html_source;//nho rang lai 
		 
		System.out.println("----path_html_source: " + path_html_source + file_name);//path=>path_html_source
		File file_ = new File(path_html_source);
		if (!file_.exists()) {
			file_.mkdirs();
		}
		Document doc;
		String dataparse = file_data;
		
		try {
			doc = Jsoup.parse(dataparse);
			Elements images = doc.select("img[src~=(?i)\\.(png|jpe?g|gif)]");

			for (Element image : images) {
				int index = image.attr("src").lastIndexOf('/');
				String destinationFile = image.attr("src").substring(index + 1);
				image.attr("src",  "/Promotion/" + destinationFile);
			}

		/*	JSONArray jsonArr = new JSONArray(code);
			for (int i = 0; i < jsonArr.length(); i++) {
				JSONObject jsonObj = jsonArr.getJSONObject(i);
				String code_ = jsonObj.getString("code");
				path_file_html = path + file_name + "_" + code_ + ".html";//path=>path_html_source
				System.out.println("path_file_html_promotion: " + path_file_html);
				BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
						new FileOutputStream(path_file_html), "UTF-8"));
				htmlWriter.write(doc.toString());
				htmlWriter.flush();
				htmlWriter.close();
				istrue = true;
			}*/
			
			//String code_ = jsonObj.getString("code");
			path_file_html = path_html_source + file_name + ".html";//path=>path_html_source
			System.out.println("path_file_html_promotion: " + path_file_html);
			BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(path_file_html), "UTF-8"));
			htmlWriter.write(doc.toString());
			htmlWriter.flush();
			htmlWriter.close();
			istrue = true;
			
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
			

		} catch (Exception e) {
			System.out.println(e.toString());
			istrue = false;
		}
		if (istrue) {
			objectBean.setStatus("SUCCESS");
		} else {
			objectBean.setStatus("ERROR");
		}
		return SUCCESS;
		
	}	
	
	// phan nay la dung cho edit
	public String Load_Edit_File() throws MalformedURLException, URISyntaxException {
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		// HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		// String filePath =request.getSession().getServletContext().getRealPath("/");
		// String path = util.getParentPath(filePath)+
		// path_html_source+"test_vn.html";

		String path_http = request.getParameter("url");
		int index = path_http.lastIndexOf('/');
		String name_ = path_http.substring(index + 1);
		// String path = Utils.getParentPath(filePath)+path_html_source + name_;//cho nay danh cho local
		String path = path_html_source + name_;//cho nay danh cho server
		System.out.println("name----: " + name_);
		session.setAttribute("name_", name_);
		System.out.println("path---------------------: " + path);
		String content = null;
		File file = new File(path);
		System.out.println("file---------------------: " + file);
		Document doc;
		String destinationFile="";
		try {

			BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(
					file), "UTF-8"));
			char[] chars = new char[(int) file.length()];
			reader.read(chars);
			content = new String(chars);
			doc = Jsoup.parse(content);
			Elements images = doc.select("img[src~=(?i)\\.(png|jpe?g|gif)]");

			for (Element image : images) {
				int idx = image.attr("src").lastIndexOf('/');
				destinationFile = image.attr("src").substring(idx + 1);
				image.attr("src", link_image_html + "/Promotion/" + destinationFile);
			}
			reader.close();
			objectBean.setData(doc.toString());
			objectBean.setFileName(name_);
			objectBean.setFileNamePromotion("/Promotion/" + destinationFile);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return SUCCESS;
	}
	
	public String Edit_File() {
		boolean istrue = true;
		HttpServletRequest request = ServletActionContext.getRequest();
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		String name_ = String.valueOf((request.getSession().getAttribute("name_")));
		System.out.println("----------name-4/11/2015: " + name_);
		// String filePath = request.getSession().getServletContext().getRealPath("/");
		// String path = Utils.getParentPath(filePath)+ path_html_source;
		System.out.println("----path 4/11/2015: " + path_html_source);
		File file = new File(path_html_source);
		if (!file.exists()) {
			file.mkdirs();
		}
		Document doc;

		String dataparse = file_data;
		try {
			doc = Jsoup.parse(dataparse);
			Elements images = doc.select("img[src~=(?i)\\.(png|jpe?g|gif)]");
			for (Element image : images) {
				int index = image.attr("src").lastIndexOf('/');
				String destinationFile = image.attr("src").substring(index + 1);
				// image.attr("src",destinationFile);
				//image.attr("src", link_image_html + "/Promotion/" + destinationFile);
				image.attr("src","/Promotion/" + destinationFile);

			}
			path_file_html = path_html_source + name_;
			//path_file_html = path + name_;
			System.out.println("---------------path_file_html edit 24/6/2016: " + path_file_html);
			BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(path_file_html), "UTF-8"));
			htmlWriter.write(doc.toString());
			htmlWriter.flush();
			htmlWriter.close();
			istrue = true;
			
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
			
		} catch (Exception e) {
			System.out.println(e.toString());
			istrue = false;
		}
		if (istrue) {
			objectBean.setStatus("SUCCESS");
		} else {
			objectBean.setStatus("ERROR");
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
	

}
