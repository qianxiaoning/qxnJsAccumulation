//����һ�����󼰶��������ڵ�����Ͷ���ʱ
//������Ʒ�deepCopy()ͨ��for in����ȫ������ȫ���������Ի� ���캯����function A()������������,var a=new A(),ͨ�����캯���õ�һ���¶���ӵ�й��캯����ȫ������
//��Ʒ���
    function deepCopy(p, c) {
        //�¶���c
        var c = c || {};
        //�����϶���p����������
        for (var i in p) {
            //����������Ǹ�����
            if (typeof p[i] === 'object') {
                //������Ե�ԭ��ָ��constructor��Array�򴴽�һ�����飬ԭ��ָ��constructor��Object�򴴽�һ������
                c[i] = (p[i].constructor === Array) ? [] : {};
                //�ݹ�һ�㷽�����������������е�ֵ������
                deepCopy(p[i], c[i]);
            } else {
                //ֱ�Ӹ������Ե��¶���
                c[i] = p[i];
            }
        }
        //��������������c�����¶���
        return c;
    }