<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="resultStorage" scope="session" class="beans.ResultStorage"/>

<!-- Вставляем данные в глобальную переменную JavaScript -->
<script>
    // Создаем массив объектов с данными точек из resultStorage
    window.pointsData = [
        <core:forEach var="currentResult" items="${resultStorage.results}">
        {
            x: ${currentResult.x},
            y: ${currentResult.y},
            r: ${currentResult.r},
            isHit: ${currentResult.isHit},
            time: "${currentResult.time != null ? currentResult.time : 'N/A'}",
            executionTime: ${currentResult.executionTime != -1 ? currentResult.executionTime : 'N/A'}
        }<c:if test="${!emptycurrentResult.index != resultStorage.results.size() - 1}">,</c:if>
        </core:forEach>
    ];
</script>

<!-- Подключаем внешний JavaScript файл -->
<script src="clicker.js"></script>
