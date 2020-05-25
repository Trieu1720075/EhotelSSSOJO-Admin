<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
	<head>
		<s:hidden id="btn-create" value="%{getText('button.create')}" />
		<s:hidden id="btn-save" value="%{getText('button.save')}" />
		<s:hidden id="btn-edit" value="%{getText('button.edit')}" />
		<s:hidden id="btn-delete" value="%{getText('button.delete')}" />
		
		<s:hidden id="table-empty" value="%{getText('table.empty')}" />
		<s:hidden id="table-info" value="%{getText('table.info')}" />
		<s:hidden id="table-info-empty" value="%{getText('table.info.empty')}" />
		<s:hidden id="table-filtered" value="%{getText('table.info.filtered')}" />
		<s:hidden id="table-menu" value="%{getText('table.length.menu')}" />
		<s:hidden id="table-loading" value="%{getText('table.loading')}" />
		<s:hidden id="table-processing" value="%{getText('table.processing')}" />
		<s:hidden id="table-search" value="%{getText('table.search')}" />
		<s:hidden id="table-record-zero" value="%{getText('table.record.zero')}" />
		<s:hidden id="table-next" value="%{getText('table.next')}" />
		<s:hidden id="table-previous" value="%{getText('table.previous')}" />
		
		<s:hidden id="subject-create-success" value="%{getText('subject.create.success')}"/>
		<s:hidden id="subject-create-fail" value="%{getText('subject.create.fail')}"/>
		<s:hidden id="subject-edit-success" value="%{getText('subject.edit.success')}"/>
		<s:hidden id="subject-edit-fail" value="%{getText('subject.edit.fail')}"/>
		<s:hidden id="subject-delete-success" value="%{getText('subject.delete.success')}"/>
		<s:hidden id="subject-delete-fail" value="%{getText('subject.delete.fail')}"/>
		<s:hidden id="subject-delete-duplicate" value="%{getText('subject.delete.duplicate')}"/>
		<s:hidden id="subject-create-title" value="%{getText('subject.create.title')}"/>
		<s:hidden id="subject-edit-title" value="%{getText('subject.edit.title')}"/>
		
		<s:hidden id="item-uploading" value="%{getText('item.uploading')}"/>
		<s:hidden id="item-saving" value="%{getText('item.saving')}"/>
		<s:hidden id="item-complete" value="%{getText('item.complete')}"/>
		<s:hidden id="item-upload-fail" value="%{getText('item.upload.fail')}"/>
		<s:hidden id="item-edit-fail" value="%{getText('item.edit.fail')}"/>
		<s:hidden id="item-delete-fail" value="%{getText('item.delete.fail')}"/>
		
		<s:hidden id="livetv-create-title" value="%{getText('livetv.create.item.title')}"/>
		<s:hidden id="livetv-edit-title" value="%{getText('livetv.edit.item.title')}"/>
		<s:hidden id="livetv-create-success" value="%{getText('livetv.create.item.success')}"/>
		<s:hidden id="livetv-create-fail" value="%{getText('livetv.create.item.fail')}"/>
		<s:hidden id="livetv-edit-success" value="%{getText('livetv.edit.item.success')}"/>
		<s:hidden id="livetv-edit-fail" value="%{getText('livetv.edit.item.fail')}"/>
		<s:hidden id="livetv-delete-success" value="%{getText('livetv.delete.item.success')}"/>
		<s:hidden id="livetv-delete-fail" value="%{getText('livetv.delete.item.fail')}"/>
		<s:hidden id="livetv-delete-duplicate" value="%{getText('livetv.delete.item.duplicate')}"/>
		
		<s:hidden id="movies-create-title" value="%{getText('movies.create.item.title')}"/>
		<s:hidden id="movies-edit-title" value="%{getText('movies.edit.item.title')}"/>
		<s:hidden id="movies-create-success" value="%{getText('movies.create.item.success')}"/>
		<s:hidden id="movies-create-fail" value="%{getText('movies.create.item.fail')}"/>
		<s:hidden id="movies-edit-success" value="%{getText('movies.edit.item.success')}"/>
		<s:hidden id="movies-edit-fail" value="%{getText('movies.edit.item.fail')}"/>
		<s:hidden id="movies-delete-success" value="%{getText('movies.delete.item.success')}"/>
		<s:hidden id="movies-delete-fail" value="%{getText('movies.delete.item.fail')}"/>
		<s:hidden id="movies-delete-duplicate" value="%{getText('movies.delete.item.duplicate')}"/>
		
		<s:hidden id="mv-create-title" value="%{getText('mv.create.item.title')}"/>
		<s:hidden id="mv-edit-title" value="%{getText('mv.edit.item.title')}"/>
		<s:hidden id="mv-create-success" value="%{getText('mv.create.item.success')}"/>
		<s:hidden id="mv-create-fail" value="%{getText('mv.create.item.fail')}"/>
		<s:hidden id="mv-edit-success" value="%{getText('mv.edit.item.success')}"/>
		<s:hidden id="mv-edit-fail" value="%{getText('mv.edit.item.fail')}"/>
		<s:hidden id="mv-delete-success" value="%{getText('mv.delete.item.success')}"/>
		<s:hidden id="mv-delete-fail" value="%{getText('mv.delete.item.fail')}"/>
		<s:hidden id="mv-delete-duplicate" value="%{getText('mv.delete.item.duplicate')}"/>
		
		<s:hidden id="music-create-title" value="%{getText('music.create.item.title')}"/>
		<s:hidden id="music-edit-title" value="%{getText('music.edit.item.title')}"/>
		<s:hidden id="music-create-success" value="%{getText('music.create.item.success')}"/>
		<s:hidden id="music-create-fail" value="%{getText('music.create.item.fail')}"/>
		<s:hidden id="music-edit-success" value="%{getText('music.edit.item.success')}"/>
		<s:hidden id="music-edit-fail" value="%{getText('music.edit.item.fail')}"/>
		<s:hidden id="music-delete-success" value="%{getText('music.delete.item.success')}"/>
		<s:hidden id="music-delete-fail" value="%{getText('music.delete.item.fail')}"/>
		<s:hidden id="music-delete-duplicate" value="%{getText('music.delete.item.duplicate')}"/>
		
		<s:hidden id="hotel-create-title" value="%{getText('hotel.create.item.title')}"/>
		<s:hidden id="hotel-edit-title" value="%{getText('hotel.edit.item.title')}"/>
		<s:hidden id="hotel-create-success" value="%{getText('hotel.create.item.success')}"/>
		<s:hidden id="hotel-create-fail" value="%{getText('hotel.create.item.fail')}"/>
		<s:hidden id="hotel-edit-success" value="%{getText('hotel.edit.item.success')}"/>
		<s:hidden id="hotel-edit-fail" value="%{getText('hotel.edit.item.fail')}"/>
		<s:hidden id="hotel-delete-success" value="%{getText('hotel.delete.item.success')}"/>
		<s:hidden id="hotel-delete-fail" value="%{getText('hotel.delete.item.fail')}"/>
		<s:hidden id="hotel-delete-duplicate" value="%{getText('hotel.delete.item.duplicate')}"/>
		
		<s:hidden id="ftp-edit-success" value="%{getText('ftp.edit.item.success')}"/>
		<s:hidden id="ftp-edit-fail" value="%{getText('ftp.edit.item.fail')}"/>
		<s:hidden id="ftp-download" value="%{getText('ftp.download')}"/>
		<s:hidden id="ftp-complete" value="%{getText('ftp.complete')}"/>
		
		<s:hidden id="message-subject-name" value="%{getText('message.subject.name')}"/>
		<s:hidden id="message-image" value="%{getText('message.image')}"/>
		<s:hidden id="message-image-size" value="%{getText('message.image.size')}"/>
		<s:hidden id="message-image-type" value="%{getText('message.image.type')}"/>
		<s:hidden id="message-file-empty" value="%{getText('message.file.empty')}"/>
		
		<s:hidden id="message-livetv-name" value="%{getText('message.livetv.name')}"/>
		<s:hidden id="message-livetv-address" value="%{getText('message.livetv.address')}"/>
		<s:hidden id="message-livetv-index" value="%{getText('message.livetv.index')}"/>
		<s:hidden id="message-livetv-index-size" value="%{getText('message.livetv.index.size')}"/>
		
		<s:hidden id="message-movie-name" value="%{getText('message.movie.name')}"/>
		<s:hidden id="message-movie-link" value="%{getText('message.movie.link')}"/>
		
		<s:hidden id="message-mv-name" value="%{getText('message.mv.name')}"/>
		<s:hidden id="message-mv-link" value="%{getText('message.mv.link')}"/>
		
		<s:hidden id="message-music-name" value="%{getText('message.music.name')}"/>
		<s:hidden id="message-music-link" value="%{getText('message.music.link')}"/>
		
		<s:hidden id="message-hotel-name" value="%{getText('message.hotel.name')}"/>
		<s:hidden id="message-hotel-link" value="%{getText('message.hotel.link')}"/>
		
		<s:hidden id="message-ftp-host" value="%{getText('message.ftp.host')}"/>
		<s:hidden id="message-ftp-port" value="%{getText('message.ftp.port')}"/>
		<s:hidden id="message-ftp-user" value="%{getText('message.ftp.user')}"/>
		<s:hidden id="message-ftp-pass" value="%{getText('message.ftp.pass')}"/>
		
		<s:hidden id="message-mail-sender" value="%{getText('message.mail.sender')}"/>
		
		<s:hidden id="create-success" value="%{getText('create.success')}"/>
		<s:hidden id="create-fail" value="%{getText('create.fail')}"/>
		<s:hidden id="edit-success" value="%{getText('edit.success')}"/>
		<s:hidden id="edit-fail" value="%{getText('edit.fail')}"/>
		<s:hidden id="delete-success" value="%{getText('delete.success')}"/>
		<s:hidden id="delete-fail" value="%{getText('delete.fail')}"/>
		
		<s:hidden id="sender-fail" value="%{getText('message-sender-fail')}"/>
		<s:hidden id="title-fail" value="%{getText('message-title-fail')}"/>
		<s:hidden id="content-fail" value="%{getText('message-content-fail')}"/>
		<s:hidden id="mystay-edit-title" value="%{getText('mystay-edit-title')}"/>
		
		<s:hidden id="dining-edit-title" value="%{getText('dining-edit-title')}"/>
		<s:hidden id="dining-add-title" value="%{getText('dining-add-title')}"/>
		<s:hidden id="dining-delete-title" value="%{getText('dining-delete-title')}"/>
		
		<s:hidden id="image-is-null" value="%{getText('image-is-null')}"/>
		<s:hidden id="name-is-null" value="%{getText('exchange-name-is-null')}"/>
		<s:hidden id="code-is-null" value="%{getText('exchange-code-is-null')}"/>
		<s:hidden id="buy-is-null" value="%{getText('exchange-buy-is-null')}"/>
		<s:hidden id="sell-is-null" value="%{getText('exchange-sell-is-null')}"/>
		<s:hidden id="tranfer-is-null" value="%{getText('exchange-tranfer-is-null')}"/>
		<s:hidden id="index-is-null" value="%{getText('exchange-index-is-null')}"/>
		<s:hidden id="exchange-item-title-add" value="%{getText('exchange-item-title-add')}"/>
		<s:hidden id="exchange-item-title-edit" value="%{getText('exchange-item-title-edit')}"/>
		<s:hidden id="promotion.edit.title" value="%{getText('promotion.edit.title')}"/>
		<s:hidden id="promotion.add.title" value="%{getText('promotion.add.title')}"/>
		<s:hidden id="promotion.delete.title" value="%{getText('promotion.delete.title')}"/>
		<s:hidden id="message-image-size-min" value="%{getText('message-image-size-min')}"/>
		
		<s:hidden id="message-user-newpass" value="%{getText('message.user.newpass')}"/>
		<s:hidden id="message-user-currentpass" value="%{getText('message.user.currentpass')}"/>
		<s:hidden id="message-user-confirmpass" value="%{getText('message.user.confirmpass')}"/>
		<s:hidden id="message-user-notmatchpass" value="%{getText('message.user.notmatchpass')}"/>
		
	</head>
<body>
</body>
</html>