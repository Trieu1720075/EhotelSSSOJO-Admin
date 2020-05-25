package elcom.ehotel.bean;

public class FileModel {

	private String filename;
	private int type; // 0 la file, 1 la folder
	private long size;

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "FileModel [filename=" + filename + ", type=" + type + ", size=" + size + "]";
	}

	

	public FileModel(String filename, int type, long size) {
		super();
		this.filename = filename;
		this.type = type;
		this.size = size;
	}

	public FileModel() {
		super();
	}

}
