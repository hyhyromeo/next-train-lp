export function convertDataTime(dataTime: string) {
  var result;
  const dataYear = parseInt(dataTime.split(" ")[0].split("-")[0]);
  const dataMonth = parseInt(dataTime.split(" ")[0].split("-")[1]);
  const dataDate = parseInt(dataTime.split(" ")[0].split("-")[2]);
  const dataHour = parseInt(dataTime.split(" ")[1].split(":")[0]);
  const dataMin = parseInt(dataTime.split(" ")[1].split(":")[1]);
  const dataSec = parseInt(dataTime.split(" ")[1].split(":")[2]);
  result = new Date(
    dataYear,
    dataMonth - 1,
    dataDate,
    dataHour,
    dataMin + 3,
    dataSec - 50
  );
  return result;
}
