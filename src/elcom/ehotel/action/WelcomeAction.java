package elcom.ehotel.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.Language;
import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.bean.Object_Welcome;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.ReadWriteUtils;
import elcom.ehotel.util.Utils;

public class WelcomeAction extends ActionConstant implements ActionBasic, ModelDriven<ObjectBean>,
		ServletRequestAware {
	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	public File file_logo;
	public File file_logo_small;
	public File file_background;
	public File file_flag;

	public String process() {
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername()); 
		return SUCCESS;
	}
	
	public String process_tool_welcome(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername()); 
		return SUCCESS;
	}

	public String Load_List_Language() {
		List<Language> listlang = new ArrayList<Language>();
		Language lg = new Language();
		lg.setIdLanguage("1");
		lg.setNamelanguage("VN");
		lg.setIcon("../MODULE-WELCOME/images/background.jpg");

		Language lg2 = new Language();
		lg2.setIdLanguage("2");
		lg2.setNamelanguage("EN");
		lg2.setIcon("../MODULE-WELCOME/images/background.jpg");

		listlang.add(lg);
		listlang.add(lg2);
		objectBean.setListLanguages(listlang);
		return SUCCESS;
	}

	public String save_Welcome() {

		// String
		// image_name_background=request.getParameter("image_name_background")+".jpg";
		// String id_room=request.getParameter("id_room");
		// String id_lang=request.getParameter("id_lang");
		// String txt_khachhang=request.getParameter("txt_khachhang");
		// String txt_gioithieu=request.getParameter("txt_gioithieu");
		// String txt_dichvu=request.getParameter("txt_dichvu");
		// System.out.println("id_lang: "+id_lang+" id_room: "+id_room+" txt_khachhang: "+txt_khachhang+" txt_gioithieu: "+txt_gioithieu+" txt_dichvu: "+txt_dichvu);

		try {
			String image_name_logo = request.getParameter("image_name_logo") + ".jpg";
			System.out.println("vao toi ham upload file logo");
			String path_logo_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_LOGO");
			String filePath = request.getSession().getServletContext().getRealPath("/");
			String path_logo = Utils.getParentPath(filePath) + path_logo_source;
			System.out.println("path_logo: " + path_logo);
			File file_logo = new File(path_logo);
			if (!file_logo.exists()) {
				file_logo.mkdirs();
			}
			Utils.createFileImage_EHotel(request, getFile_logo(), image_name_logo,
					path_logo_source, null);
			objectBean.setFileName(image_name_logo);
		} catch (Exception ex) {
			ex.toString();
			return ERROR;
		}
		// cho nay insert image logo

		/*
		 * //cho nay insert image background
		 * System.out.println("vao toi ham upload file background"); String
		 * path_background_source =
		 * ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_BACKGROUND"); String
		 * filePath_bacground =
		 * request.getSession().getServletContext().getRealPath("/"); String
		 * path_background = Utils.getParentPath(filePath_bacground)+
		 * path_background_source;
		 * System.out.println("path_background: "+path_background); File
		 * file_background = new File(path_background); if
		 * (!file_background.exists()) { file_background.mkdirs(); }
		 * Utils.createFileImage_EHotel(request, getFile_background(),
		 * image_name_background, path_background_source, null);
		 * System.out.println("aaaaaaa");
		 */

		return SUCCESS;
	}

	public String delete_file() {
		try {
			String file_name = request.getParameter("file_name");
			String path_root = ReadWriteUtils.getProperty("PATH_IMAGES_ROOT");
			String filePath_bacground = request.getSession().getServletContext().getRealPath("/");
			String path_background = Utils.getParentPath(filePath_bacground) + path_root
					+ file_name;
			System.out.println("path_background_delete: " + path_background);
			File file_background = new File(path_background);
			if (file_background.exists()) {
				file_background.delete();
			}

		} catch (Exception e) {
			System.out.println(e.toString());
			return ERROR;
		}
		return SUCCESS;
	}

	public String save_logo() {
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			String time = Long.toString(timestamp.getTime());
			
			String image_name_logo = "logo_" + time + ".png";
			System.out.println("vao toi ham upload file logo");
			String path_logo_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_LOGO");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_LOGO");
			String path_logo = path_logo_source;
			System.out.println("path_logo: " + path_logo);
			File file_logo = new File(path_logo);
			if (!file_logo.exists()) {
				file_logo.mkdirs();
			}
			Utils.createFileImage_EHotel(request, getFile_logo(), image_name_logo,
					path_logo_source, null);
			objectBean.setFileName(subfix + image_name_logo);
		} catch (Exception ex) {
			ex.toString();
			return ERROR;
		}
		return SUCCESS;
	}

	public String save_two_logo() {
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			String time = Long.toString(timestamp.getTime());
			
			String image_name_logo = "logo_" + time +".png";
			String image_name_logo_small = "logo_small_" + time + ".png";
			String path_logo_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_LOGO");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_LOGO");
			String path_logo = path_logo_source;
			System.out.println("path_logo: " + path_logo);
			File file_logo = new File(path_logo);
			if (!file_logo.exists()) {
				file_logo.mkdirs();
			}
			if (getFile_logo() != null) {
				Utils.createFileImage_EHotel(request, getFile_logo(), image_name_logo,
						path_logo_source, null);
			}
			if (getFile_logo_small() != null) {
				Utils.createFileImage_EHotel(request, getFile_logo_small(), image_name_logo_small,
						path_logo_source, null);
			}

			objectBean.setName_logo(subfix + image_name_logo);
			objectBean.setName_logo_small(subfix + image_name_logo_small);
		} catch (Exception ex) {
			ex.toString();
			return ERROR;
		}
		return SUCCESS;
	}

	public String save_logo_small() {
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			String time = Long.toString(timestamp.getTime());
			
			String image_name_logo = "logo_small_" + time + ".png";
			System.out.println("vao toi ham upload file logo small");
			String path_logo_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_LOGO");
			String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_LOGO");
			String path_logo = path_logo_source;
			System.out.println("path_logo: " + path_logo);
			File file_logo = new File(path_logo);
			if (!file_logo.exists()) {
				file_logo.mkdirs();
			}
			Utils.createFileImage_EHotel(request, getFile_logo(), image_name_logo,
					path_logo_source, null);
			objectBean.setFileName(subfix + image_name_logo);
		} catch (Exception ex) {
			ex.toString();
			return ERROR;
		}
		return SUCCESS;
	}

	public String load_data_content() {
		try {
			Object_Welcome obj = new Object_Welcome();
			obj.setFilename("/../html/logo/06135944.jpg");
			obj.setFilenameold("/../html/logo/06135944.jpg");
			obj.setDichvu("Please choose language");
			obj.setGioithieu("Welcome to my resort");
			objectBean.setObject_welcome(obj);
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return ERROR;
		}

		return SUCCESS;
	}

	public String delete_language() {
		return SUCCESS;
	}

	public String add_language() {
		String image_name_flag = request.getParameter("image_name_flag") + ".jpg";
		System.out.println("vao toi ham upload file flag");
		String path_flag_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_FLAG");
		String path_flag = path_flag_source;
		System.out.println("path_flag: " + path_flag);
		File file_flag = new File(path_flag);
		if (!file_flag.exists()) {
			file_flag.mkdirs();
		}
		Utils.createFileImage_EHotel(request, getFile_flag(), image_name_flag, path_flag_source,
				null);

		objectBean.setFileName(image_name_flag);
		return SUCCESS;
	}

	public String Load_List_Background() {
		List<Language> listlang = new ArrayList<Language>();
		Language lg = new Language();
		lg.setIdLanguage("1");
		lg.setStatus("0");
		lg.setNamelanguage("VN");
		lg.setIcon("http://localhost:8080/html/background/06090827.jpg");

		Language lg2 = new Language();
		lg2.setIdLanguage("2");
		lg2.setStatus("0");
		lg2.setNamelanguage("EN");
		lg2.setIcon("http://localhost:8080/html/background/06090827.jpg");

		Language lg3 = new Language();
		lg3.setIdLanguage("3");
		lg3.setStatus("0");
		lg3.setNamelanguage("CN");
		lg3.setIcon("http://localhost:8080/html/background/06090827.jpg");

		Language lg4 = new Language();
		lg4.setIdLanguage("4");
		lg4.setStatus("1");
		lg4.setNamelanguage("CN");
		lg4.setIcon("http://localhost:8080/html/background/06090827.jpg");

		Language lg5 = new Language();
		lg5.setIdLanguage("5");
		lg5.setStatus("0");
		lg5.setNamelanguage("CN");
		lg5.setIcon("http://localhost:8080/html/background/06090827.jpg");

		listlang.add(lg);
		listlang.add(lg2);
		listlang.add(lg3);
		listlang.add(lg4);
		listlang.add(lg5);
		objectBean.setListLanguages(listlang);
		return SUCCESS;
	}

	public String Delete_List_Background() {
		String path_image = request.getParameter("path_image");
		int index_id = path_image.lastIndexOf('/');
		String file_name = path_image.substring(index_id + 1);
		System.out.println("file_name: " + file_name);

		String path_background_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_BACKGROUND");
		String filePath_bacground = request.getSession().getServletContext().getRealPath("/");
		String path_background = Utils.getParentPath(filePath_bacground) + path_background_source;
		System.out.println("path_background: " + path_background);
		File file_background = new File(path_background);
		if (!file_background.exists()) {
			file_background.mkdirs();
		}
		return SUCCESS;
	}

	public String add_background() {

		try {
			// cho nay insert image background
			System.out.println("vao toi ham upload file background");
			String image_name_flag = request.getParameter("image_name_flag") + ".png";
			String path_background_source = ReadWriteUtils.getProperty("PATH_IMAGES_SOURCE_BACKGROUND");
			 String subfix = ReadWriteUtils.getProperty("PATH_IMAGES_SUBFIX_BACKGROUND");
			/* String filePath_bacground =request.getSession().getServletContext().getRealPath("/");
			 String path_background = Utils.getParentPath(filePath_bacground)+ path_background_source;*/
			String path_background = path_background_source;
			System.out.println("path_background: " + path_background);
			File file_background = new File(path_background);
			if (!file_background.exists()) {
				file_background.mkdirs();
			}
			Utils.createFileImage_EHotel(request, getFile_background(), image_name_flag,
					path_background_source, null);
			objectBean.setFileName(subfix+image_name_flag);
		} catch (Exception e) {
			System.out.println(e.toString());
			return ERROR;
		}

		return SUCCESS;
	}
	
	public String getBirthdayHtml() {
		try {
			String pathHtmlBirthday = ReadWriteUtils.getProperty("PATH_HTML_BIRTHDAY");
			String urlHttp = request.getParameter("urlFile");
			int index = urlHttp.lastIndexOf('/');
			String name = urlHttp.substring(index + 1);
			String pathFile = pathHtmlBirthday + name;
			System.out.println("---Get file html birthday name---: " + pathFile);
			
			String content = "";
			File file = new File(pathFile);
			Document doc;
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
			char[] chars = new char[(int) file.length()];
			reader.read(chars);
			content = new String(chars);
			doc = Jsoup.parse(content);
			reader.close();
			objectBean.setData(doc.toString());
			
		} catch (Exception e) {
			System.out.println(e.toString());
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String saveBirthdayHtml(){
		try {
			String pathHtmlBirthday = ReadWriteUtils.getProperty("PATH_HTML_BIRTHDAY");
			String urlHttp = request.getParameter("urlFile");
			String data = request.getParameter("data");
			String html = "<html>" + data + "</html>";
			
			int index = urlHttp.lastIndexOf('/');
			String name = urlHttp.substring(index + 1);
			String pathFile = pathHtmlBirthday + name;
			System.out.println("---Save file html birthday name---: " + pathFile);

			
			File file = new File(pathFile);
			if (!file.exists()) {
				file.mkdirs();
			}
			
			Document doc;
			doc = Jsoup.parse(html);
			
			BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(pathFile), "UTF-8"));
			htmlWriter.write(doc.toString());
			htmlWriter.flush();
			htmlWriter.close();
			
			objectBean.setData(pathFile);
			objectBean.setResult("success");
			
		} catch (Exception e) {
			System.out.println(e.toString());
			return ERROR;
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
	
	

	public ObjectBean getObjectBean() {
		return objectBean;
	}

	public void setObjectBean(ObjectBean objectBean) {
		this.objectBean = objectBean;
	}

	public File getFile_logo() {
		return file_logo;
	}

	public void setFile_logo(File file_logo) {
		this.file_logo = file_logo;
	}

	public File getFile_background() {
		return file_background;
	}

	public void setFile_background(File file_background) {
		this.file_background = file_background;
	}

	public File getFile_flag() {
		return file_flag;
	}

	public void setFile_flag(File file_flag) {
		this.file_flag = file_flag;
	}

	public File getFile_logo_small() {
		return file_logo_small;
	}

	public void setFile_logo_small(File file_logo_small) {
		this.file_logo_small = file_logo_small;
	}

}
