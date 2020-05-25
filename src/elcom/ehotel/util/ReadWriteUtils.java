package elcom.ehotel.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ReadWriteUtils {
	
	public static String getProperty(String code) {
		String pathProperties=System.getProperty("catalina.home")+"/webapps"+KeyUtils.PATH_PROPERTIES_FILE;		
		//String pathProperties="/webapps"+KeyUtils.PATH_PROPERTIES_FILE;		
		String value = "";
		Properties properties = new Properties();
		try {			
	/*		properties.load(ReadWriteUtils.class.getResourceAsStream(KeyUtils.PATH_PROPERTIES_FILE));
			value = properties.getProperty(code);*/
			properties.load(new FileInputStream(pathProperties));
			value = properties.getProperty(code);
    

		} catch (IOException e) {
			e.printStackTrace();
		}

		return value;
	}
}
