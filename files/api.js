/**
 * MIT Campus AMS - API Helper
 * Centralized API communication module
 * Handles all HTTP requests to Spring Boot backend
 */

const API_BASE_URL = "http://localhost:8080/api";

class ApiHelper {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper
   * @param {string} method HTTP method (GET, POST, PUT, DELETE)
   * @param {string} endpoint API endpoint path (without /api)
   * @param {object} data Request body (optional)
   * @returns {Promise<object>} { success, message, data }
   */
  async request(method, endpoint, data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      // Backend returns { success, message, data }
      if (json.success === undefined) {
        // Legacy response format fallback
        return {
          success: response.ok,
          message: json.message || (response.ok ? "Success" : "Error"),
          data: json,
        };
      }

      return json;
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      return {
        success: false,
        message: "Unable to connect to the appointment service.",
        data: null,
      };
    }
  }

  // ==================== AUTH ====================
  async registerStudent(formData) {
    return this.request("POST", "/auth/student/register", {
      name: formData.name,
      registerNumber: formData.registerNumber,
      department: formData.department,
      year: formData.year,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      contactNumber: formData.contactNumber || "",
    });
  }

  async registerOfficial(formData) {
    return this.request("POST", "/auth/official/register", {
      name: formData.name,
      employeeId: formData.employeeId,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      contactNumber: formData.contactNumber || "",
      designation: formData.designation,
      department: formData.department,
    });
  }

  async login(email, password, role) {
    return this.request("POST", "/auth/login", {
      email,
      password,
      role, // must be "student" or "official"
    });
  }

  // ==================== OFFICIALS ====================
  async getOfficials(department = null) {
    const path = department ? `/officials?department=${encodeURIComponent(department)}` : "/officials";
    return this.request("GET", path);
  }

  async getOfficial(officialId) {
    return this.request("GET", `/officials/${officialId}`);
  }

  // ==================== STUDENTS ====================
  async getStudent(studentId) {
    return this.request("GET", `/students/${studentId}`);
  }

  // ==================== APPOINTMENTS ====================
  async createAppointment(studentId, officialId, purpose, requestedDate, preferredTime, description = "") {
    return this.request("POST", "/appointments", {
      studentId,
      officialId,
      purpose,
      description,
      requestedDate,
      preferredTime,
    });
  }

  async getAppointments(role, userId) {
    return this.request("GET", `/appointments/${role}/${userId}`);
  }

  async approveAppointment(appointmentId, officialId, allocatedDate, allocatedTime, remarks = "") {
    return this.request("PUT", `/appointments/${appointmentId}/approve`, {
      officialId,
      allocatedDate,
      allocatedTime,
      remarks,
    });
  }

  async rejectAppointment(appointmentId, officialId, remarks) {
    return this.request("PUT", `/appointments/${appointmentId}/reject`, {
      officialId,
      remarks,
    });
  }

  // ==================== NOTIFICATIONS ====================
  async getNotifications(userId) {
    return this.request("GET", `/notifications/${userId}`);
  }

  async markNotificationsRead(userId) {
    return this.request("PUT", `/notifications/${userId}/read-all`);
  }

  // ==================== AVAILABILITY ====================
  async getAvailability(officialId) {
    return this.request("GET", `/availability/${officialId}`);
  }

  async saveAvailability(officialId, items) {
    return this.request("PUT", `/availability/official/${officialId}`, {
      items,
    });
  }

  // ==================== DASHBOARD ====================
  async getDashboard(role, userId) {
    return this.request("GET", `/dashboard/${role}/${userId}`);
  }

  // ==================== PROFILE ====================
  async getProfile(role, userId) {
    const endpoint = role === "student" ? `/students/${userId}` : `/officials/${userId}`;
    return this.request("GET", endpoint);
  }
}

// Create global API instance
const api = new ApiHelper();
