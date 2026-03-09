import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Megaphone, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: '系统升级维护通知', content: '为了提供更好的服务，系统将于本周六凌晨2点至4点进行升级维护...', author: 'admin', date: '2023-10-25', status: '已发布' },
    { id: 2, title: '新增50种常见中草药识别模型', content: '本次更新引入了全新的ResNet模型，新增了对50种常见中草药的识别能力...', author: 'admin', date: '2023-10-18', status: '已发布' },
    { id: 3, title: '关于规范使用API接口的说明', content: '近期发现部分用户频繁调用API导致服务器负载过高，请合理控制调用频率...', author: 'admin', date: '2023-10-10', status: '草稿' },
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">公告管理</h1>
          <p className="text-sm text-slate-500">发布和管理系统内部公告通知</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索公告标题..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            发布公告
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-1/2">公告标题</th>
                <th className="px-6 py-4">发布人</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">发布时间</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Megaphone className={`w-4 h-4 ${item.status === '已发布' ? 'text-emerald-500' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 mb-1">{item.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-md">{item.content}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {item.author}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === '已发布' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === '已发布' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="编辑">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <span>共 {announcements.length} 条公告</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">上一页</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
