angular.module("app.factories").
	factory('bookmarkFactory', function($q) {
		var getBookmarks = function() {
			var deferred = $q.defer();

			Liferay.Service(
				'/bookmarks.bookmarksentry/get-group-entries',
				{
					groupId: Liferay.ThemeDisplay.getScopeGroupId(),
					start: -1,
					end: -1
				},
				// Calling like this, with additional function param, calls it async
				// http://www.liferay.com/de/community/forums/-/message_boards/view_message/12303402
				// Using promise ($q) to make this work
				function(obj) {
					deferred.resolve(obj);
				}
			);

			return deferred.promise;
		};

		var saveBookmark = function(bookmark) {
			var deferred = $q.defer();

			Liferay.Service(
				'/bookmarks.bookmarksentry/update-entry',
				{
					entryId: bookmark.entryId,
					groupId: bookmark.groupId,
					folderId: bookmark.folderId,
					name: bookmark.name,
					url: bookmark.url,
					description: bookmark.description,
					serviceContext: {}
				},
				function(obj) {
					deferred.resolve(obj);
				}
			);

			return deferred.promise;
		};

		var addBookmark = function(bookmark) {
			var deferred = $q.defer();

			Liferay.Service(
				'/bookmarks.bookmarksentry/add-entry',
				{
					groupId: Liferay.ThemeDisplay.getScopeGroupId(),
					folderId: 0,
					name: bookmark.name,
					url: bookmark.url,
					description: bookmark.description,
					serviceContext: {}
				},
				function(obj) {
					deferred.resolve(obj);
				}
			);

			return deferred.promise;
		};

		var deleteBookmark = function(bookmark) {
			var deferred = $q.defer();

			Liferay.Service(
				'/bookmarks.bookmarksentry/delete-entry',
				{
					entryId: bookmark.entryId
				},
				function(obj) {
					deferred.resolve(obj);
				}
			);

			return deferred.promise;
		};

		return {
			getBookmarks: getBookmarks,
			saveBookmark: saveBookmark,
			addBookmark: addBookmark,
			deleteBookmark: deleteBookmark
		};
	}
);