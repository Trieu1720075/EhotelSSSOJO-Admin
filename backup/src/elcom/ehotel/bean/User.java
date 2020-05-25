package elcom.ehotel.bean;

import java.util.Vector;

public class User {
	private String username;
	private String fullName;
	private String password;
	private String role;
	private String roleId;
	private String creator;
	private String parentCreator;
	private String status;
	private String userId;
	private String siteId;
	private String siteName;
	private Vector<Object> page;
	private String dateMin;
	private String dateMax;
	private String dateMinCus;
	private String dateMaxCus;
	private String dateMinQMS;
	private String dateMaxQMS;

	public String getDateMinCus() {
		return dateMinCus;
	}

	public void setDateMinCus(String dateMinCus) {
		this.dateMinCus = dateMinCus;
	}

	public String getDateMaxCus() {
		return dateMaxCus;
	}

	public void setDateMaxCus(String dateMaxCus) {
		this.dateMaxCus = dateMaxCus;
	}

	public String getDateMinQMS() {
		return dateMinQMS;
	}

	public void setDateMinQMS(String dateMinQMS) {
		this.dateMinQMS = dateMinQMS;
	}

	public String getDateMaxQMS() {
		return dateMaxQMS;
	}

	public void setDateMaxQMS(String dateMaxQMS) {
		this.dateMaxQMS = dateMaxQMS;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getParentCreator() {
		return parentCreator;
	}

	public void setParentCreator(String parentCreator) {
		this.parentCreator = parentCreator;
	}

	public Vector<Object> getPage() {
		return page;
	}

	public void setPage(Vector<Object> page) {
		this.page = page;
	}

	public String getDateMin() {
		return dateMin;
	}

	public void setDateMin(String dateMin) {
		this.dateMin = dateMin;
	}

	public String getDateMax() {
		return dateMax;
	}

	public void setDateMax(String dateMax) {
		this.dateMax = dateMax;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the roleId
	 */
	public String getRoleId() {
		return roleId;
	}

	/**
	 * @param roleId the roleId to set
	 */
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
