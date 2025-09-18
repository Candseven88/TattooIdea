"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Trophy, Share2, Heart, Zap } from 'lucide-react';

interface TattooItem {
  id: string;
  imageUrl: string;
  name: string;
  wins: number;
  losses: number;
  elo: number;
  winRate: number;
}

// 预设的纹身图片数据
const tattooImages: TattooItem[] = [
  {
    id: '1',
    imageUrl: '/inspiration/Burning Wing Of A Phoenix Rising From.webp',
    name: 'Phoenix Rising',
    wins: 15061,
    losses: 5985,
    elo: 2107,
    winRate: 71.6
  },
  {
    id: '2',
    imageUrl: '/inspiration/Wolf And Mountains And Trees.webp',
    name: 'Wolf & Mountains',
    wins: 6339,
    losses: 6374,
    elo: 1746,
    winRate: 49.9
  },
  {
    id: '3',
    imageUrl: '/inspiration/Growling Wolf Face And Realistic Rocky.webp',
    name: 'Howling Wolf',
    wins: 7070,
    losses: 6415,
    elo: 1725,
    winRate: 52.4
  },
  {
    id: '4',
    imageUrl: '/inspiration/Archangel Uriel.webp',
    name: 'Archangel Uriel',
    wins: 7589,
    losses: 6713,
    elo: 1717,
    winRate: 53.1
  },
  {
    id: '5',
    imageUrl: '/inspiration/An Hourglass Moon Dream Catcher Filled.webp',
    name: 'Moon Dream Catcher',
    wins: 6334,
    losses: 13216,
    elo: 1689,
    winRate: 32.4
  },
  {
    id: '6',
    imageUrl: '/inspiration/Crowned Lion Face.webp',
    name: 'Crowned Lion',
    wins: 5720,
    losses: 22585,
    elo: 1682,
    winRate: 20.2
  },
  {
    id: '7',
    imageUrl: '/inspiration/Angel Wings Behind A Sword, Roses.webp',
    name: 'Angel Wings & Sword',
    wins: 7399,
    losses: 6450,
    elo: 1676,
    winRate: 53.4
  },
  {
    id: '8',
    imageUrl: '/inspiration/Chinese Dragon And Phoenix And Skull.webp',
    name: 'Dragon & Phoenix',
    wins: 5964,
    losses: 6135,
    elo: 1664,
    winRate: 49.3
  },
  {
    id: '9',
    imageUrl: '/inspiration/Hooded Arch Angel Defeating A Demon.webp',
    name: 'Archangel vs Demon',
    wins: 6159,
    losses: 1464,
    elo: 1651,
    winRate: 80.8
  },
  {
    id: '10',
    imageUrl: '/inspiration/Wolf And Woods And Mountains.webp',
    name: 'Wolf in Woods',
    wins: 7467,
    losses: 16544,
    elo: 1637,
    winRate: 31.1
  }
];

const TeaspillPage = () => {
  const [currentPair, setCurrentPair] = useState<[TattooItem, TattooItem] | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<TattooItem[]>([]);
  const [userVotes, setUserVotes] = useState<{[key: string]: number}>({});
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showLeaderboardShareDropdown, setShowLeaderboardShareDropdown] = useState(false);

  useEffect(() => {
    // 从localStorage加载用户投票历史
    const savedVotes = localStorage.getItem('teaspill-votes');
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }

    // 生成排行榜数据
    generateLeaderboardData();
    
    // 生成新的投票对
    generateNewPair();
  }, []);

  const generateLeaderboardData = () => {
    // 生成伪排行榜数据
    const fakeData: TattooItem[] = Array.from({ length: 50 }, (_, i) => {
      const inspirationImages = [
        '/inspiration/Compass.webp',
        '/inspiration/Crooked Scary Looking Tree Wich Gnarled..webp',
        '/inspiration/Filigree Design With Playing Cards.webp',
        '/inspiration/Gothic Tree Of Life Intertwined With.webp',
        '/inspiration/Hooded Reaper Silohuette, Smoke, Fire.webp',
        '/inspiration/Hooded Reaper.webp',
        '/inspiration/Massive Forest Landscape With Huge Moon.webp',
        '/inspiration/Peace And Lightining Storm And Time.webp',
        '/inspiration/Scorpio And Capricorn Tattoo Design.webp',
        '/inspiration/Stairway To Heaven Walking Up Stairs.webp',
        '/inspiration/Two Rose Wrapped One Black One Red.webp',
        '/inspiration/Wolf With Blue Eyes On Armor Tattoo.webp'
      ];
      
      return {
        id: `fake-${i + 1}`,
        imageUrl: inspirationImages[Math.floor(Math.random() * inspirationImages.length)],
        name: `Tattoo Design ${i + 1}`,
        wins: Math.floor(Math.random() * 20000) + 1000,
        losses: Math.floor(Math.random() * 20000) + 1000,
        elo: Math.floor(Math.random() * 2000) + 300,
        winRate: Math.floor(Math.random() * 80) + 20
      };
    });

    // 合并真实数据和假数据
    const combinedData = [...tattooImages, ...fakeData];
    combinedData.sort((a, b) => b.elo - a.elo);
    setLeaderboardData(combinedData);
  };

  const generateNewPair = () => {
    const shuffled = [...tattooImages].sort(() => 0.5 - Math.random());
    setCurrentPair([shuffled[0], shuffled[1]]);
    setSelectedItem(null);
  };

  const handleVote = (itemId: string) => {
    setSelectedItem(itemId);
    
    // 更新用户投票历史
    const newVotes = { ...userVotes };
    newVotes[itemId] = (newVotes[itemId] || 0) + 1;
    setUserVotes(newVotes);
    localStorage.setItem('teaspill-votes', JSON.stringify(newVotes));

    // 播放投票音效（如果有的话）
    // 这里可以添加音效

    // 延迟后生成新的投票对
    setTimeout(() => {
      generateNewPair();
    }, 2000);
  };

  const shareResults = async () => {
    const text = `🎨 Just voted on some amazing tattoo designs on Teaspill! Check out the leaderboard and vote for your favorites! #Teaspill #TattooDesigns #VoteForArt`;
    const url = window.location.href;
    
    try {
      // 检查是否支持原生分享API（主要在移动设备上）
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: 'Teaspill Tattoo Voting',
          text: text,
          url: url
        };
        
        // 检查是否可以分享这些数据
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          console.log('✅ Native share successful!');
          return;
        }
      }
      
      // 如果不支持原生分享，尝试复制到剪贴板
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        alert('✅ Share text copied to clipboard! You can now paste it anywhere.');
      } else {
        // 降级方案：使用传统的复制方法
        const textArea = document.createElement('textarea');
        textArea.value = `${text}\n\n${url}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Share text copied to clipboard! You can now paste it anywhere.');
      }
    } catch (error) {
      console.error('Share failed:', error);
      
      // 最后的降级方案：显示分享文本
      const shareText = `${text}\n\n${url}`;
      alert(`Share this text:\n\n${shareText}`);
    }
  };

  const openSocialShare = (platform: string) => {
    const text = `🎨 Just voted on some amazing tattoo designs on Teaspill! Check out the leaderboard and vote for your favorites! #Teaspill #TattooDesigns #VoteForArt`;
    const url = window.location.href;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'copy':
        // 复制链接到剪贴板
        navigator.clipboard.writeText(url).then(() => {
          alert('✅ Link copied to clipboard!');
        }).catch(() => {
          // 降级方案
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('✅ Link copied to clipboard!');
        });
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.share-dropdown-container')) {
        setShowShareDropdown(false);
        setShowLeaderboardShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Voting
            </button>
            <h1 className="text-3xl font-bold text-center flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
              Teaspill Leaderboard
            </h1>
            <div className="relative inline-block share-dropdown-container">
              <button
                onClick={() => setShowLeaderboardShareDropdown(!showLeaderboardShareDropdown)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              
              {/* Social Media Share Dropdown */}
              {showLeaderboardShareDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[200px]">
                  <div className="text-sm font-semibold text-gray-700 mb-2 px-2">Share on:</div>
                  <button
                    onClick={() => {
                      openSocialShare('twitter');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                  >
                    🐦 Twitter
                  </button>
                  <button
                    onClick={() => {
                      openSocialShare('facebook');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                  >
                    📘 Facebook
                  </button>
                  <button
                    onClick={() => {
                      openSocialShare('linkedin');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                  >
                    💼 LinkedIn
                  </button>
                  <button
                    onClick={() => {
                      openSocialShare('whatsapp');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-green-50 rounded text-green-600 flex items-center"
                  >
                    💬 WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      openSocialShare('telegram');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                  >
                    📱 Telegram
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      openSocialShare('copy');
                      setShowLeaderboardShareDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-gray-600 flex items-center"
                  >
                    📋 Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="grid gap-4">
            {leaderboardData.slice(0, 50).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center"
              >
                <div className="flex items-center w-full">
                  <div className="text-2xl font-bold mr-4 min-w-[60px]">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 hidden">
                      <span className="text-gray-500 text-xs">Image</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Wins: {item.wins.toLocaleString()}</span>
                      <span>Losses: {item.losses.toLocaleString()}</span>
                      <span>Win Rate: {item.winRate}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">ELO {item.elo}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Zap className="w-8 h-8 mr-3 text-purple-600" />
            Teaspill
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Vote for your favorite tattoo designs and see them climb the leaderboard!
          </p>
        </div>

        {/* Voting Section */}
        {currentPair && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentPair.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleVote(item.id)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 hidden">
                        <span className="text-gray-500 text-lg">{item.name}</span>
                      </div>
                    </div>
                    
                    {/* ELO Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg"
                        animate={{
                          scale: selectedItem === item.id ? [1, 1.3, 1] : 1,
                          rotate: selectedItem === item.id ? [0, 10, -10, 0] : 0,
                          y: selectedItem === item.id ? [0, -5, 0] : 0
                        }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        ELO {item.elo}
                      </motion.div>
                    </div>

                    {/* Selection Effect */}
                    <AnimatePresence>
                      {selectedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-green-500/30 flex items-center justify-center backdrop-blur-sm"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          >
                            <Heart className="w-20 h-20 text-green-500 drop-shadow-lg" fill="currentColor" />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="absolute bottom-4 text-white font-bold text-lg bg-black/50 px-3 py-1 rounded-full"
                          >
                            VOTED!
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Wins: {item.wins.toLocaleString()}</span>
                        <span>Losses: {item.losses.toLocaleString()}</span>
                        <span>Win Rate: {item.winRate}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* VS Text */}
            <div className="text-center my-8">
              <motion.div
                className="text-4xl font-bold text-purple-600 relative"
                animate={{ 
                  scale: [1, 1.2, 1],
                  textShadow: [
                    "0 0 0px rgba(147, 51, 234, 0)",
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                    "0 0 0px rgba(147, 51, 234, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">VS</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all mr-4 mb-4 sm:mb-0"
          >
            <Trophy className="w-5 h-5 inline mr-2" />
            View Leaderboard
          </button>
          <div className="relative inline-block share-dropdown-container">
            <button
              onClick={() => setShowShareDropdown(!showShareDropdown)}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-all mr-4 mb-4 sm:mb-0"
            >
              <Share2 className="w-5 h-5 inline mr-2" />
              Share Results
            </button>
            
            {/* Social Media Share Dropdown */}
            {showShareDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[200px]">
                <div className="text-sm font-semibold text-gray-700 mb-2 px-2">Share on:</div>
                <button
                  onClick={() => {
                    openSocialShare('twitter');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                >
                  🐦 Twitter
                </button>
                <button
                  onClick={() => {
                    openSocialShare('facebook');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                >
                  📘 Facebook
                </button>
                <button
                  onClick={() => {
                    openSocialShare('linkedin');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                >
                  💼 LinkedIn
                </button>
                <button
                  onClick={() => {
                    openSocialShare('whatsapp');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-green-50 rounded text-green-600 flex items-center"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => {
                    openSocialShare('telegram');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-blue-600 flex items-center"
                >
                  📱 Telegram
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={() => {
                    openSocialShare('copy');
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-gray-600 flex items-center"
                >
                  📋 Copy Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Your Voting Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
            <motion.div 
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(userVotes).length}
              </div>
              <div className="text-sm text-gray-600">Votes Cast</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-bold text-green-600">
                {Object.values(userVotes).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Votes</div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold text-blue-600">
                {leaderboardData.length}
              </div>
              <div className="text-sm text-gray-600">Total Designs</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaspillPage; 