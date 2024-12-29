<%@ page import="graph.Point" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <title> Lab2 </title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
<form id="myForm">
  <table>
    <tr class="footer">
      <td class="student-name"> VASILEV ALEKSANDER</td>
      <td class="student-info">P3225<br>Variant:951</td>
    </tr>

    <tr class="space"></tr>

    <tr class="content-block">
      <td class="graph">
        <div class="graph-block">
          <canvas id="myCanvas" width="600" height="600" onclick="handleClick(event);"></canvas>
          <input type="hidden" id="image_click" name="image_click" value="false">
          <%
            // Отображение всех точек
            List<Point> points = (List<Point>) application.getAttribute("results");
            if (points != null) {
              double graphWidth = 600;
              double graphHeight = 600;
              double offsetX = graphWidth / 2;
              double offsetY = graphHeight / 2;
              double rad = points.get(points.size()-1).getR();

              for (Point point : points) {
                double px = offsetX + point.getX()/point.getR()*200/rad*point.getR()-5;
                double py = offsetY - point.getY()/point.getR()*200/rad*point.getR()-5;

                if (px < 0) px = 0;
                if (px > graphWidth) px = graphWidth;
                if (py < 0) py = 0;
                if (py > graphHeight) py = graphHeight;

                String color = point.getIsHit() ? "green" : "red";
          %>
          <div class="dot" style="left:<%= px %>px; top:<%= py %>px; background-color:<%= color %>;"></div>
          <%
              }
            }
          %>
        </div>
        </div>
      </td>

      <td class="error-table" id="error-table">
        <div class="error-message" id="error-message"></div>
      </td>

      <td class="results">
        <div class="results-table-block">
          <table class="result-table" id="result-table">
            <thead class="table-head">
            <tr>
              <th scope="col" class="item">X</th>
              <th scope="col" class="item">Y</th>
              <th scope="col" class="item">R</th>
              <th scope="col" class="item">HitStatus</th>
              <th scope="col" class="item">Execution time</th>
              <th scope="col" class="item">Execution Speed</th>
            </tr>
            </thead>
            <tbody class="rows">
            <jsp:include page="table-result.jsp" />
            </tbody>
          </table>
        </div>
      </td>
    </tr>

    <tr class="space"></tr>

    <tr class="input-name-block">
      <td class="input-name"> Enter X</td>
      <td class="horizontal-space"></td>
      <td class="input-name"> Enter Y</td>
      <td class="horizontal-space"></td>
      <td class="input-name"> Enter R</td>
      <td class="horizontal-space"></td>
      <td class="input-name"></td>
    </tr>

    <tr class="space"></tr>

    <tr class="input-block">
      <td class="button-option-block">
        <table class="inner-table">
          <tr>
            <td><input type="button" id="x-button-3" name="x" value="3" class="button-options" onclick="setX(3)">
              <label for="x-button-3" class="button-option-label">3</label></td>
            <td><input type="button" id="x-button-2" name="x" value="2" class="button-options" onclick="setX(2)">
              <label for="x-button-2" class="button-option-label">2</label></td>
            <td><input type="button" id="x-button-1" name="x" value="1" class="button-options" onclick="setX(1)">
              <label for="x-button-1" class="button-option-label">1</label></td>
            <td><input type="button" id="x-button-0" name="x" value="0" class="button-options" onclick="setX(0)">
              <label for="x-button-0" class="button-option-label">0</label></td>
          </tr>
          <tr>
            <td><input type="button" id="x-button--1" name="x" value="-1" class="button-options" onclick="setX(-1)">
              <label for="x-button--1" class="button-option-label">-1</label></td>
            <td><input type="button" id="x-button--2" name="x" value="-2" class="button-options" onclick="setX(-2)">
              <label for="x-button--2" class="button-option-label">-2</label></td>
            <td><input type="button" id="x-button--3" name="x" value="-3" class="button-options" onclick="setX(-3)">
              <label for="x-button--3" class="button-option-label">-3</label></td>
            <td><input type="button" id="x-button--4" name="x" value="-4" class="button-options" onclick="setX(-4)">
              <label for="x-button--4" class="button-option-label">-4</label></td>
            <td><input type="button" id="x-button--5" name="x" value="-5" class="button-options" onclick="setX(-5)">
              <label for="x-button--5" class="button-option-label">-5</label></td>
          </tr>
        </table>
        <input type="hidden" id="x_value" name="x">
      </td>

      <td class="horizontal-space"></td>
      <td class="text-field-input-block">
        <label for="y"> </label>
        <input class="text-field-input" type="text" name="y" id="y" placeholder="(-5, 3)" value="">
        <input type="hidden" id="y_value" name="y">
      </td>
      <td class="horizontal-space"></td>
      <td class="text-field-input-block">
        <label for="r"> </label>
        <input class="text-field-input" type="text" name="r" id="r" placeholder="(1, 4)" maxlength="3" value="">
      </td>

      <td class="horizontal-space"></td>

      <td class="submit-button" id="submitButton">Submit</td>
    </tr>
  </table>
</form>


<script src="canvas.js"></script>
<script src="script.js"></script>

<script src="clicker.js"></script>
</body>

</html>
