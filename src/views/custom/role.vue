<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      // 假数据
      this.listLoading = false
      this.list = [
        {
          'id': '45000020111014895X',
          'title': 'Twoq lyenxscpbx ccnfipmkdu obupzayr lwkgdgowyo exftimi eqvvamdzek lhlinviur ywwhnrc gdtbtd dyrrxgbmw gcmoq okdno xvgibme sjtypgldng.',
          'status': 'draft',
          'author': 'name',
          'display_time': '2007-09-15 22:55:19',
          'pageviews': 3711
        },
        {
          'id': '42000019860920771X',
          'title': 'Kfum utcl ffjfinss wjgmifoo solip uifun ubu kzql vekgjprp kixad yysqlo gole iwxnbpu.',
          'status': 'published',
          'author': 'name',
          'display_time': '1975-07-16 06:40:09',
          'pageviews': 1487
        },
        {
          'id': '810000197406176552',
          'title': 'Abscihi uxpi tfy qpdwsi wlkgvily fdcoow hnsc xpwbeqg nwfrga eujeig ijcwnlnc gshtnyfe xlp cxwop oybjote tgwtbl uhlreri.',
          'status': 'published',
          'author': 'name',
          'display_time': '2012-01-25 15:49:49',
          'pageviews': 1647
        },
        {
          'id': '310000200108056321',
          'title': 'Pirj lxodln boyhzev exqrnxvumm prbns jtqlkuaz qtttxvj wxfqxw ldolteat gcqcrmut byjlhqv hxwgercded umabdxbk ddlnlgtxii.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1988-01-21 06:19:36',
          'pageviews': 520
        },
        {
          'id': '110000201408173826',
          'title': 'Ymmcxuewbn cprkrlu hvms fey bkovobr skwvv oordxlfg mcfaccbsd rcmneen klwqwgwug yeagczmr btig fueomvmzvf oducxmpew nbegprc kuej fhin.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1993-11-17 10:06:29',
          'pageviews': 2006
        },
        {
          'id': '460000200702098199',
          'title': 'Bhvjxx dtlimjeurj fedrd diterqf dnf bfytdh irynr nxyucotdj qdicjkbw pnfodgg wlcjo nxifgi pncluthlq ubfgksc dltfcoul jevwqtwrv.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '1977-12-30 19:41:56',
          'pageviews': 1281
        },
        {
          'id': '45000020151009177X',
          'title': 'Tcxu ceoevhm bekgh zqher vktxnu ewqlp qoputnd juuebjga yrnijb gzvnwbg fkkrr jlv.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '2016-07-07 01:15:37',
          'pageviews': 4587
        },
        {
          'id': '520000197105066836',
          'title': 'Hghbl mfjbmopmws hlwrpsn udupmai fwhju rutzsbkxr dnfy ebmjfjlq djcvorxz txvoxhq veyflce dxegopqdkn ihchhne.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1984-01-06 12:32:56',
          'pageviews': 2752
        },
        {
          'id': '420000201406025232',
          'title': 'Qsks hxrtxpky djpjogw fkbyjvo hmyjeynlj fvnksf atbirk odtvvosref hkgrxyd qqqnhjvm gmkpyuu nbx dukqlfh cgpdfo mbjqzvc evciu droxwtfmr ydwgriw tmgvhujvq.',
          'status': 'published',
          'author': 'name',
          'display_time': '1991-08-07 01:11:48',
          'pageviews': 3258
        },
        {
          'id': '360000200407271610',
          'title': 'Junwjuobl josxkp vyh hhyc lgtnowfbkk zocpgyb lmrlxwpa jgwwephvul bjpm fsd zrhq xrf lffpv.',
          'status': 'draft',
          'author': 'name',
          'display_time': '2007-12-26 00:36:14',
          'pageviews': 3714
        },
        {
          'id': '130000198808138658',
          'title': 'Cwpicrem ixeuj hkznjbkhl tbrm vaddyjxf logqkxg prpuygvvb ukcwssob juovxpgy roofnohn utdkexs qcyf lhkyhcy.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1978-06-03 11:28:38',
          'pageviews': 4960
        },
        {
          'id': '340000197304050710',
          'title': 'Iptcthroz ylf rzg hvuj lpulge vgpajnlbd usufprib gqtbrqurf udptyvj rjooekem tjatpmj mkxpeo yivzei qtyek.',
          'status': 'published',
          'author': 'name',
          'display_time': '1994-11-30 06:44:31',
          'pageviews': 1299
        },
        {
          'id': '640000197210205110',
          'title': 'Qwwode sfoy xklwfrrz zwdxcn osjrfi mitu yhijnd etvycjcd ktbqde ixsgy kedkfcdejh rzudxqpr wlpxwok ojhhyxfp pfht bjhpvhp nhv gzjojqdbt.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1985-04-27 19:10:06',
          'pageviews': 1130
        },
        {
          'id': '42000019871216560X',
          'title': 'Leowycm qltp jcn bwoohgq fkcd vvlb mzbhh jojkqlbgz xgekjqmx iqkk ofymvpd ldcmno kbdyy wooutvsd.',
          'status': 'published',
          'author': 'name',
          'display_time': '1974-08-06 10:12:53',
          'pageviews': 1643
        },
        {
          'id': '420000198602214677',
          'title': 'Hffx xdnweuvyj dpbf kpftiqaw tglvos mpbyhow dcwtqcp ldtlt mor eub vicfrfen fvylveux gejimuk wpejncf kfomg.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '2014-10-13 10:15:26',
          'pageviews': 3133
        },
        {
          'id': '640000198203112551',
          'title': 'Ewrhhp verky biiurh lfrcx wuvolpwo sjlbgrxpg awqfijeiwv jukfsg iwfxufdy cquofkq pugyue.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '1993-06-01 04:45:35',
          'pageviews': 1009
        },
        {
          'id': '150000201409047677',
          'title': 'Jvzxnmdbc tomovi xaqpob rtepeh pnllb lotcmhmfs lqci oqcspp yqijebvl xvw ivholm okegogystq qiuku kiyrqjuisy egen poxqh zdvqgfs foiswwj jliyhbukx qwarnick.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '1971-10-07 02:49:26',
          'pageviews': 3476
        },
        {
          'id': '460000198608181623',
          'title': 'Oddu bngvemq hufthcd qyyqjdgj tmtss puhvms mdljjmfzu vvfsv djoirfi jnsc rbhkyxsoa kevs fxsexgzm ptsn qumhc pvspt tsrkf lvfjgdva vllsck.',
          'status': 'draft',
          'author': 'name',
          'display_time': '2004-10-06 07:13:15',
          'pageviews': 3733
        },
        {
          'id': '420000198304237053',
          'title': 'Ubmb wrrhkge rwxaygxcpy oxovgvxeqa rrmszupkr kswnyqhbe ovvibwp lwiy hohbl xnyc ynoi mbqudp ehoymidso rshbpv rswbta qahl gmdflkx.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1996-12-04 15:53:29',
          'pageviews': 1257
        },
        {
          'id': '140000200207039859',
          'title': 'Dfvv xrdbgbi rzwjwfckp hdvsd juvxmhuq qbedpnw hombt ymax lzzt ock hemikxp espx.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1978-01-08 10:30:39',
          'pageviews': 3027
        },
        {
          'id': '460000200803278658',
          'title': 'Bsqurgird dpycrjeiz rowaxbc vrz qzhgfg nbsdkocf byd wwu rbpmmrig osib fgszq aau vyovjk qsld.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1990-01-27 06:13:27',
          'pageviews': 1044
        },
        {
          'id': '350000198909110743',
          'title': 'Oilqssjbk qmtnrrdh xfnmnyl uizbqv riddm tdwryml qwt kptpwfhzs ipbrcaly hvhxcg ymjodk mcgdqyanz bnzbcl yrcpigyhs tqgbmc vqxv lkkradf bupdpkqf slknlkn.',
          'status': 'draft',
          'author': 'name',
          'display_time': '2010-05-21 21:41:53',
          'pageviews': 997
        },
        {
          'id': '61000020010302150X',
          'title': 'Xmmstn jysgvtunn xkdcnjiq mchtfdmq ncfrq zqpshb wxhkvh mkysky mccdptrk voolyf okfyy pqxkbj hfgpsfx.',
          'status': 'draft',
          'author': 'name',
          'display_time': '1975-12-03 17:34:51',
          'pageviews': 3198
        },
        {
          'id': '360000197806272157',
          'title': 'Ijddkmcvl wnsp atzlzw dlmkhhclg bbcc moidfh xrmlew uogvw mjvdgem jngddxfwb rezq ymtnjujh fsvutb elpfhqo raxwl jrltfc fkiowbd ydvv pzqbv.',
          'status': 'published',
          'author': 'name',
          'display_time': '2013-09-25 07:49:31',
          'pageviews': 535
        },
        {
          'id': '230000199702252987',
          'title': 'Pzwsw zayqsvoz ovgq eecenitaip lpss gciprcr bibydkilg ujjch yupvfpue yzyyv.',
          'status': 'published',
          'author': 'name',
          'display_time': '1996-07-15 08:21:49',
          'pageviews': 4483
        },
        {
          'id': '430000197610092419',
          'title': 'Cnueq frefflnsm ukqijdxh eabziynjl bsjrf xpugfidvfr pcnmtgk qsoiubk lrqy hfuwf hjcoulmm.',
          'status': 'published',
          'author': 'name',
          'display_time': '1993-04-23 05:01:16',
          'pageviews': 1400
        },
        {
          'id': '140000199901291944',
          'title': 'Nxkn akz dhesjjxvb qrgyieinc kfnywi qibwhtgk pabbhqumdx ydewdwn slwgjenr pdvrfd vblkjifuq qkmki vjp wvs jljgwn lkswcu.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '1997-06-11 02:44:24',
          'pageviews': 4696
        },
        {
          'id': '330000199308059445',
          'title': 'Lqv jykqprgw ozcyg qtpmy meqrftvhuu jzjdxd yghoqkt djmuks lavkufyd jmtwhpy plbjllb bslyursze fnq yqjndtc nexgcre dhpsdcwo tvhutqbis mlgir tvcejvo.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '2014-05-08 18:41:44',
          'pageviews': 2759
        },
        {
          'id': '630000197407096649',
          'title': 'Ktjrbcfonr viyym qqcjig wxakknt ykfyafw spgbtao dwuiayub soifk nnv srubn zavmekhusu chaeginh adbjjnxd gkhpagcva yzdovxsniv jgxgbviy htprdztsfu izbip.',
          'status': 'deleted',
          'author': 'name',
          'display_time': '1972-10-25 07:21:02',
          'pageviews': 4230
        },
        {
          'id': '440000197903035217',
          'title': 'Cyjryhldd yhrcar crvyy fobfjbr ujl rlcqcv glkun eeqlnnoi wrprdnys dqytdxe kxwwn gimqhbro aqgq.',
          'status': 'draft',
          'author': 'name',
          'display_time': '2006-07-01 05:01:33',
          'pageviews': 3784
        }
      ]
    }
  }
}
</script>
