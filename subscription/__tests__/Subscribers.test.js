/**
 * @fileoverview Unit tests for Subscribers.js
 * Tests for form submission handling and subscriber management
 */

// Mock the Apps Script APIs
const mockPropertiesService = {
  getProperty: jest.fn(),
  setProperty: jest.fn(),
};

const mockFormApp = {
  openByUrl: jest.fn(),
};

const mockSpreadsheetApp = {
  getActive: jest.fn(),
};

const mockSession = {
  getEffectiveUser: jest.fn(() => ({
    getEmail: jest.fn(() => 'owner@example.com'),
  })),
};

const mockMailApp = {
  sendEmail: jest.fn(),
  getRemainingDailyQuota: jest.fn(() => 100),
};

// Setup global mocks before importing code
global.PropertiesService = mockPropertiesService;
global.FormApp = mockFormApp;
global.SpreadsheetApp = mockSpreadsheetApp;
global.Session = mockSession;
global.MailApp = mockMailApp;
global.Utilities = {
  formatDate: (date, tz, format) => {
    if (format === 'dd/MM/yyyy HH:mm:ss') {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return date.toString();
  },
};

// Import the functions to test
const { parseEuroDate_, getActiveSubscribers } = require('../Subscribers.js');

describe('Subscribers.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseEuroDate_', () => {
    it('should parse European format date string correctly', () => {
      const dateString = '14/11/2025 10:30:45';
      const result = parseEuroDate_(dateString);

      expect(result).toBeInstanceOf(Date);
      expect(result.getDate()).toBe(14);
      expect(result.getMonth()).toBe(10); // 0-indexed
      expect(result.getFullYear()).toBe(2025);
      expect(result.getHours()).toBe(10);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it('should handle different date values', () => {
      const dateString = '01/01/2024 00:00:00';
      const result = parseEuroDate_(dateString);

      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2024);
    });

    it('should parse dates with leading zeros', () => {
      const dateString = '05/03/2025 15:45:30';
      const result = parseEuroDate_(dateString);

      expect(result.getDate()).toBe(5);
      expect(result.getMonth()).toBe(2);
    });
  });

  describe('getActiveSubscribers', () => {
    it('should return only approved subscribers', () => {
      const mockSheet = {
        getDataRange: jest.fn(() => ({
          getValues: jest.fn(() => [
            ['ID', 'Timestamp', 'URL', 'Email', 'Subscription', 'Approved'],
            ['1', new Date(), 'http://edit1', 'user1@example.com', 'Yes', true],
            ['2', new Date(), 'http://edit2', 'user2@example.com', 'Yes', false],
            ['3', new Date(), 'http://edit3', 'user3@example.com', 'Yes', true],
          ]),
        })),
      };

      mockSpreadsheetApp.getActive.mockReturnValue({
        getSheetByName: jest.fn(() => mockSheet),
      });

      const result = getActiveSubscribers();

      expect(result).toHaveLength(2);
      expect(result[0][3]).toBe('user1@example.com');
      expect(result[1][3]).toBe('user3@example.com');
    });

    it('should filter out unapproved subscribers', () => {
      const mockSheet = {
        getDataRange: jest.fn(() => ({
          getValues: jest.fn(() => [
            ['ID', 'Timestamp', 'URL', 'Email', 'Subscription', 'Approved'],
            ['1', new Date(), 'http://edit1', 'user1@example.com', 'No', true],
          ]),
        })),
      };

      mockSpreadsheetApp.getActive.mockReturnValue({
        getSheetByName: jest.fn(() => mockSheet),
      });

      const result = getActiveSubscribers();

      expect(result).toHaveLength(0);
    });

    it('should handle empty subscriber list', () => {
      const mockSheet = {
        getDataRange: jest.fn(() => ({
          getValues: jest.fn(() => [
            ['ID', 'Timestamp', 'URL', 'Email', 'Subscription', 'Approved'],
          ]),
        })),
      };

      mockSpreadsheetApp.getActive.mockReturnValue({
        getSheetByName: jest.fn(() => mockSheet),
      });

      const result = getActiveSubscribers();

      expect(result).toHaveLength(0);
    });
  });
});
