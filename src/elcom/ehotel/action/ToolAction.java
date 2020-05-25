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

public class ToolAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean>,
		ServletRequestAware {
	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	public File file_upload;
	public String image_name;
	public String file_data;
	private String path_file_html = "";

	public String editor() {
		return SUCCESS;
	}

	public String process() {
		return SUCCESS;
	}

	public String process_edit() {
		return SUCCESS;
	}

	// phan nay la dung cho insert
	public String Upload_Image() {
		System.out.println("vao toi ham upload file");
		String path_images_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE");
		// HttpServletRequest request = ServletActionContext.getRequest();
		// String filePath =
		// request.getSession().getServletContext().getRealPath("/");
		// String path2 = Utils.getParentPath(filePath)+ path_images_source;
		System.out.println("path: " + path_images_source);
		String image_name = request.getParameter("image_name");
		File file = new File(path_images_source);
		if (!file.exists()) {
			file.mkdirs();
		}
		Utils.createFileImage_EHotel(request, getFile_upload(), image_name + ".jpg",
				path_images_source, null);
		objectBean.setData(image_name);
		return SUCCESS;
	}

	public String insert_file() {

		boolean istrue = true;
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		// String filePath =
		// request.getSession().getServletContext().getRealPath("/");
		String file_name = request.getParameter("file_name");
		String code = request.getParameter("code");
		// String path = Utils.getParentPath(filePath)+ path_html_source;
		System.out.println("----path_html_source: " + path_html_source + file_name);
		File file_ = new File(path_html_source);
		if (!file_.exists()) {
			file_.mkdirs();
		}
		Document doc;
		String dataparse = file_data;
		System.out.println("dataparse: " + dataparse);
		try {
			doc = Jsoup.parse(dataparse);
			Elements images = doc.select("img[src~=(?i)\\.(png|jpe?g|gif)]");

			for (Element image : images) {
				int index = image.attr("src").lastIndexOf('/');
				String destinationFile = image.attr("src").substring(index + 1);
				//image.attr("src", link_image_html + "/images/" + destinationFile);
				image.attr("src", "/Image/images/" + destinationFile);
			}

			JSONArray jsonArr = new JSONArray(code);
			for (int i = 0; i < jsonArr.length(); i++) {
				JSONObject jsonObj = jsonArr.getJSONObject(i);
				String code_ = jsonObj.getString("code");
				path_file_html = path_html_source + file_name + "_" + code_ + ".html";
				System.out.println("path_file_html: " + path_file_html);
				BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
						new FileOutputStream(path_file_html), "UTF-8"));
				htmlWriter.write(doc.toString());
				htmlWriter.flush();
				htmlWriter.close();
				istrue = true;
			}
			System.out.println("Permission");
			Permisson p = new Permisson();
			int k = p.setPermission();
			System.out.println("Permission " + k);
			

		} catch (Exception e) {
			System.out.println(e.toString());
			istrue = false;
		}
		if (istrue) {
			objectBean.setData("Insert sucsessful");
		} else {
			objectBean.setData("Insert Not sucsessful");
		}
		return SUCCESS;
	}

	// phan nay la dung cho edit
	public String Load_Edit_File() throws MalformedURLException, URISyntaxException {
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		// HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		// String filePath =
		// request.getSession().getServletContext().getRealPath("/");
		// String path = util.getParentPath(filePath)+
		// path_html_source+"test_vn.html";

		String path_http = request.getParameter("url");
		int index = path_http.lastIndexOf('/');
		String name_ = path_http.substring(index + 1);
		String path = path_html_source + name_;
		System.out.println("name----: " + name_);
		session.setAttribute("name_", name_);
		System.out.println("path---------------------: " + path);
		String content = null;
		File file = new File(path);
		System.out.println("file---------------------: " + file);
		Document doc;
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
				String destinationFile = image.attr("src").substring(idx + 1);
				image.attr("src", link_image_html + "/images/" + destinationFile);
			}
			reader.close();
			objectBean.setData(doc.toString());
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return SUCCESS;
	}

	/*
	 * public String Upload_Image(){
	 * System.out.println("vao toi ham upload file"); String path_images_source
	 * = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE"); HttpServletRequest
	 * request = ServletActionContext.getRequest(); String filePath =
	 * request.getSession().getServletContext().getRealPath("/"); String path2 =
	 * util.getParentPath(filePath)+ path_images_source;
	 * System.out.println("path: "+path2); String
	 * image_name=request.getParameter("image_name"); File file = new
	 * File(path2); if (!file.exists()) { file.mkdirs(); }
	 * 
	 * util.createFileImage_EHotel(request, getFile_upload(), image_name+".jpg",
	 * path_images_source, null); objectBean.setData(image_name); return
	 * SUCCESS; }
	 */

	public String Edit_File() {
		boolean istrue = true;
		HttpServletRequest request = ServletActionContext.getRequest();
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		String name_ = String.valueOf((request.getSession().getAttribute("name_")));
		System.out.println("----------name-4/11/2015: " + name_);
		// String filePath =
		// request.getSession().getServletContext().getRealPath("/");
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
				image.attr("src", "/Image/images/" + destinationFile);

			}
			path_file_html = path_html_source + name_;
			System.out.println("---------------path_file_html edit 20/4/2016: " + path_file_html);
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
			objectBean.setData("Edit sucsessful");
		} else {
			objectBean.setData("Edit Not sucsessful");
		}
		return SUCCESS;
	}
	
	public String EditFileWithName() {
		boolean istrue = true;
		HttpServletRequest request = ServletActionContext.getRequest();
		String path_html_source = ReadWriteUtils.getProperty("PATH_HTML_SOURCE");
		String link_image_html = ReadWriteUtils.getProperty("LINK_IMAGE_HTML");
		String name_ = request.getParameter("fileName");
		System.out.println("----name: " + name_);

		System.out.println("---path: " + path_html_source);
		
	
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
				image.attr("src", "/Image/images/" + destinationFile);

			}

			System.out.println("-------File html edit:" + path_file_html);
			BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream( path_html_source + name_), "UTF-8"));
			htmlWriter.write(doc.toString());
			htmlWriter.flush();
			htmlWriter.close();
			istrue = true;
			
		} catch (Exception e) {
			System.out.println(e.toString());
			istrue = false;
		}
		if (istrue) {
			objectBean.setResult("success");
			objectBean.setData("Edit sucsessful");
		} else {
			objectBean.setResult("fail");
			objectBean.setData("Edit Not sucsessful");
		}
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

	public File getFile_upload() {
		return file_upload;
	}

	public void setFile_upload(File file_upload) {
		this.file_upload = file_upload;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	public String getFile_data() {
		return file_data;
	}

	public void setFile_data(String file_data) {
		this.file_data = file_data;
	}

}
