//��ҳlaydate�������
function layDate() {
    var start = {
        elem: '#start',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //�趨��С����Ϊ��ǰ����
        max: '2099-06-01', //�������
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas; //��ʼ��ѡ�ú����ý����յ���С����
            end.start = datas //�������յĳ�ʼֵ�趨Ϊ��ʼ��
        }
    };
    var end = {
        elem: '#end',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: '2099-06-01',
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas; //������ѡ�ú����ÿ�ʼ�յ��������
        }
    };
    laydate(start);laydate(end);
}