<%@ page contentType="text/html;charset=UTF-8" %>

<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="resultStorage" scope="session" class="beans.ResultStorage"/>
<core:forEach var="currentResult" items="${resultStorage.results}">
    <tr>
        <th>${currentResult.x}</th>
        <th>${currentResult.y}</th>
        <th>${currentResult.r}</th>
        <th>${currentResult.isHit}</th>
        <td>${currentResult.time != null ? currentResult.time : "N/A"}</td>
        <td>${currentResult.executionTime != -1 ? currentResult.executionTime : "N/A"}</td>
    </tr>
</core:forEach>


