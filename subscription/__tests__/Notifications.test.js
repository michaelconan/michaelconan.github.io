/**
 * @fileoverview Unit tests for Notifications.js
 * Tests for blog fetching and notification sending
 */

// Mock the Apps Script APIs
const mockPropertiesService = {
  getProperty: jest.fn(),
  setProperty: jest.fn(),
};

const mockPropertiesServiceAPI = {
  getScriptProperties: jest.fn(() => mockPropertiesService),
};

const mockUrlFetchApp = {
  fetch: jest.fn(),
};

const mockXmlService = {
  parse: jest.fn(),
  getNamespace: jest.fn(),
};

const mockMailApp = {
  sendEmail: jest.fn(),
  getRemainingDailyQuota: jest.fn(() => 100),
};

// Setup global mocks
global.PropertiesService = mockPropertiesServiceAPI;
global.UrlFetchApp = mockUrlFetchApp;
global.XmlService = mockXmlService;
global.MailApp = mockMailApp;
global.console = {
  log: jest.fn(),
  warn: jest.fn(),
};

// Import the functions to test
const { getScriptProperties, getNewBlogs, sendMessages } = require('../Notifications.js');

describe('Notifications.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getScriptProperties', () => {
    it('should return script properties', () => {
      mockPropertiesService.getProperty.mockReturnValue('2025-11-08');

      const result = getScriptProperties();

      expect(result).toBe(mockPropertiesService);
      expect(mockPropertiesServiceAPI.getScriptProperties).toHaveBeenCalled();
    });
  });

  describe('getNewBlogs', () => {
    it('should return entries published after the last check date', () => {
      const lastBlogDate = new Date('2025-11-08');

      // Mock XML structure
      const mockEntry1 = {
        getChild: jest.fn((name, ns) => {
          if (name === 'published') {
            return { getText: jest.fn(() => '2025-11-09T10:00:00Z') };
          } else if (name === 'title') {
            return { getText: jest.fn(() => 'Test Blog Post') };
          } else if (name === 'summary') {
            return { getText: jest.fn(() => 'Test summary') };
          } else if (name === 'link') {
            return {
              getAttribute: jest.fn(() => ({
                getValue: jest.fn(() => 'http://example.com/post1'),
              })),
            };
          }
          return null;
        }),
      };

      const mockEntry2 = {
        getChild: jest.fn((name, ns) => {
          if (name === 'published') {
            return { getText: jest.fn(() => '2025-11-07T10:00:00Z') };
          } else if (name === 'title') {
            return { getText: jest.fn(() => 'Old Post') };
          } else if (name === 'summary') {
            return { getText: jest.fn(() => 'Old summary') };
          } else if (name === 'link') {
            return {
              getAttribute: jest.fn(() => ({
                getValue: jest.fn(() => 'http://example.com/old'),
              })),
            };
          }
          return null;
        }),
      };

      const mockAtomNS = {};

      const mockRootElement = {
        getChild: jest.fn((name, ns) => ({
          getText: jest.fn(() => 'My Blog Title'),
        })),
        getChildren: jest.fn((name, ns) => [mockEntry1, mockEntry2]),
      };

      mockXmlService.parse.mockReturnValue({
        getRootElement: jest.fn(() => mockRootElement),
      });

      mockXmlService.getNamespace.mockReturnValue(mockAtomNS);
      mockPropertiesService.getProperty.mockReturnValue('http://example.com/feed');
      mockUrlFetchApp.fetch.mockReturnValue({
        getContentText: jest.fn(() => '<feed></feed>'),
      });

      const result = getNewBlogs(lastBlogDate);

      expect(result.title).toBe('My Blog Title');
      expect(result.entries).toHaveLength(1);
      expect(result.entries[0].title).toBe('Test Blog Post');
      expect(result.latestDate).toBeTruthy();
    });

    it('should return empty entries when no new blogs', () => {
      const lastBlogDate = new Date('2025-11-09');

      const mockEntry = {
        getChild: jest.fn((name, ns) => {
          if (name === 'published') {
            return { getText: jest.fn(() => '2025-11-08T10:00:00Z') };
          } else if (name === 'title') {
            return { getText: jest.fn(() => 'Old Post') };
          } else if (name === 'summary') {
            return { getText: jest.fn(() => 'Old summary') };
          } else if (name === 'link') {
            return {
              getAttribute: jest.fn(() => ({
                getValue: jest.fn(() => 'http://example.com/old'),
              })),
            };
          }
          return null;
        }),
      };

      const mockAtomNS = {};

      const mockRootElement = {
        getChild: jest.fn((name, ns) => ({
          getText: jest.fn(() => 'My Blog Title'),
        })),
        getChildren: jest.fn((name, ns) => [mockEntry]),
      };

      mockXmlService.parse.mockReturnValue({
        getRootElement: jest.fn(() => mockRootElement),
      });

      mockXmlService.getNamespace.mockReturnValue(mockAtomNS);
      mockPropertiesService.getProperty.mockReturnValue('http://example.com/feed');
      mockUrlFetchApp.fetch.mockReturnValue({
        getContentText: jest.fn(() => '<feed></feed>'),
      });

      const result = getNewBlogs(lastBlogDate);

      expect(result.entries).toHaveLength(0);
      expect(result.latestDate).toBeUndefined();
    });
  });

  describe('sendMessages', () => {
    it('should send emails to all subscribers', () => {
      const blogTitle = 'My Blog';
      const entries = [
        {
          title: 'Test Post',
          summary: 'A test post',
          link: 'http://example.com/post',
          publishedDate: new Date('2025-11-09'),
        },
      ];
      const subscribers = [
        ['1', new Date(), 'http://edit1', 'user1@example.com'],
        ['2', new Date(), 'http://edit2', 'user2@example.com'],
      ];

      sendMessages(blogTitle, entries, subscribers);

      expect(mockMailApp.sendEmail).toHaveBeenCalledTimes(2);
      expect(mockMailApp.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'user1@example.com',
          subject: 'New My Blog blog',
        })
      );
    });

    it('should not send if quota is exceeded', () => {
      mockMailApp.getRemainingDailyQuota.mockReturnValue(0);

      const blogTitle = 'My Blog';
      const entries = [];
      const subscribers = [['1', new Date(), 'http://edit1', 'user1@example.com']];

      sendMessages(blogTitle, entries, subscribers);

      expect(mockMailApp.sendEmail).not.toHaveBeenCalled();
    });

    it('should include edit URL in email body', () => {
      mockMailApp.getRemainingDailyQuota.mockReturnValue(100);
      mockPropertiesService.getProperty.mockReturnValue('http://example.com/feed');

      const blogTitle = 'My Blog';
      const entries = [];
      const editUrl = 'http://forms.example.com/edit123';
      const subscribers = [['1', new Date(), editUrl, 'user@example.com']];

      sendMessages(blogTitle, entries, subscribers);

      expect(mockMailApp.sendEmail).toHaveBeenCalled();
      const callArgs = mockMailApp.sendEmail.mock.calls[0][0];
      expect(callArgs.htmlBody).toContain(editUrl);
    });
  });
});
