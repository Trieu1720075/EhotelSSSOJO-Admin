package elcom.ehotel.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ModelDriven;

import elcom.ehotel.bean.ObjectBean;
import elcom.ehotel.bean.ObjectPMS;
import elcom.ehotel.common.ActionBasic;
import elcom.ehotel.common.ActionConstant;
import elcom.ehotel.util.ReadWriteUtils;
import elcom.ehotel.util.Utils;

public class PMSAction extends ActionConstant implements ActionBasic,
ServletRequestAware, ModelDriven<ObjectBean>{

	private ObjectBean objectBean = new ObjectBean();
	private HttpServletRequest request;
	private HttpServletResponse response;
	private InputStream inputStream;
	private String fileName;
	private long contentLength;
	    
	    

	
	public String process(){
		objectBean.setLanguageId(Utils.getLanguageId());
		objectBean.setUsername(Utils.getUsername());
		return SUCCESS;
	}
	
	public String getFile(){
		String path_folder = ReadWriteUtils.getProperty("PATH_FOLDER");//server
		File folder = new File(path_folder);//server
		request = ServletActionContext.getRequest();
		String date=request.getParameter("date");
		//File folder = new File("D:/ftpfile/");//local
		File[] listOfFiles = folder.listFiles();
		List<ObjectPMS> list = new ArrayList<ObjectPMS>();
		    for (int i = listOfFiles.length-1; i >=0 ; i--) {
		      if (listOfFiles[i].isFile()) {		  
		    	String iii =  new SimpleDateFormat("dd/MM/yyyy").format(listOfFiles[i].lastModified());
		    	if(iii.equalsIgnoreCase(date)){
		    		 ObjectPMS pms = new ObjectPMS();
				        pms.setNamefile(listOfFiles[i].getName());
				        pms.setDate(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss a").format(listOfFiles[i].lastModified()));		      
				        list.add(pms);
		    	}
		       
		      } else if (listOfFiles[i].isDirectory()) {
		        System.out.println("Directory " + listOfFiles[i].getName());
		      }
		    }
		    objectBean.setListpms(list);
		    return SUCCESS;
	}
	
	public String chooseFile(){
		request = ServletActionContext.getRequest();
		String value="";
		String filename=request.getParameter("filename");		
		String path_folder = ReadWriteUtils.getProperty("PATH_FOLDER");//server
		File folder = new File(path_folder);//server
		//File folder = new File("D:/ftpfile/");//local
		 value=readFile(folder+"/"+filename);			
		 objectBean.setData(value);
		 return SUCCESS;
	}
	
	public static String readFile(String path){
		String sCurrentLine="";
		String charline="";
		try{
			BufferedReader br = new BufferedReader(new FileReader(path));
			while ((sCurrentLine = br.readLine()) != null) {				
				charline+=sCurrentLine+"\n";
			}			
			
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return charline;
	}
	
	public String dowloadFile() throws IOException, ServletException {
		String path_folder_log = ReadWriteUtils.getProperty("PATH_FOLDER_LOG");// server
		// String path_folder_log = "D:/log.txt";//local
		System.out.println("path_folder_log: " + path_folder_log);
		File fileToDownload = new File(path_folder_log);
		inputStream = new FileInputStream(fileToDownload);
		fileName = fileToDownload.getName();
		contentLength = fileToDownload.length();

		return SUCCESS;
	}
	
	
	@Override
	public ObjectBean getModel() {
		// TODO Auto-generated method stub
		return objectBean;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setContentLength(long contentLength) {
		this.contentLength = contentLength;
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		
	}

	public ObjectBean getObjectBean() {
		return objectBean;
	}

	public void setObjectBean(ObjectBean objectBean) {
		this.objectBean = objectBean;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	
	public InputStream getInputStream() {
		return inputStream;
	}


	public String getFileName() {
		return fileName;
	}



	public long getContentLength() {
		return contentLength;
	}
	

}
