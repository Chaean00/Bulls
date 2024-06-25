package com.example.bulls.Service;

import com.example.bulls.DTO.*;
import com.example.bulls.Entity.MatchPost;
import com.example.bulls.Entity.Team;
import com.example.bulls.Entity.User;
import com.example.bulls.Exception.AlreadyRegisteredTeamException;
import com.example.bulls.Exception.AlreadyRegisteredUserException;
import com.example.bulls.Repository.MatchPostRepository;
import com.example.bulls.Repository.TeamRepository;
import com.example.bulls.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.bulls.Config.CustomUserDetails;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final MatchPostRepository matchPostRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository, MatchPostRepository matchPostRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.matchPostRepository = matchPostRepository;
    }

    // 팀 등록
    @Transactional
    public boolean teamRegister(TeamDTO teamRegisterDTO) {
        // 인증되어있는 객체에서 userName가져오기
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String uid = userDetails.getUsername();
        Optional<User> optionalUser = userRepository.findByUid(uid);
        User user = optionalUser.get();

        Team team = new Team();
        team.setTeamName(teamRegisterDTO.getTeamName());
        team.setTeamIntroduce(teamRegisterDTO.getTeamIntroduce());
        team.setTeamArea(teamRegisterDTO.getTeamArea());
        team.setTeamPhone(teamRegisterDTO.getTeamPhone());
        team.setTeamCaptain(teamRegisterDTO.getTeamCaptain());
        team.setNickname(user.getNickname());

        // 중복 검증
        validateDuplicateTeam(team);

        teamRepository.save(team);

        team.addUser(user);

        return true;
    }

    // 본인이 속한 팀 정보 반환
    public TeamDTO teamInfo() {
        try {
            // 인증되어있는 객체에서 userName가져오기
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUid(uid);

            Optional<Team> team = teamRepository.findByNickname(optionalUser.get().getNickname());

            if (team.isPresent()) {
                return TeamDTO.builder()
                        .teamName(team.get().getTeamName())
                        .teamArea(team.get().getTeamArea())
                        .teamIntroduce(team.get().getTeamIntroduce())
                        .teamCaptain(team.get().getTeamCaptain())
                        .teamPhone(team.get().getTeamPhone())
                        .build();
            } else {
                return null;
            }

        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }
    }

    // 본인이 속한 팀 삭제
    @Transactional
    public String teamDelete() {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUid(uid);

            userRepository.save(optionalUser.get());

            Optional<Team> team = teamRepository.findByNickname(optionalUser.get().getNickname());
            teamRepository.delete(team.get());

            return "삭제 완료";
        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }
    }

    // 모든 게시판 조회
    public List<MatchDTO> getAllBoard() {
        // 모든 데이터 매칭날짜 기준으로 오름차순 정렬
        List<MatchPost> matchPosts = matchPostRepository.findAll(Sort.by(Sort.Direction.ASC, "matchDate"));
//        List<MatchPost> matchPosts = matchPostRepository.findAllByOrderByMatchDateAsc(); // 성능향상
        List<MatchDTO> dtos = new ArrayList<>();
        for (MatchPost matchPost : matchPosts) {
            // 변환 및 리스트에 추가하는 로직...
            MatchDTO matchDTO = MatchDTO.builder()
                    .id(matchPost.getId())
                    .matchDate(matchPost.getMatchDate())
                    .matchTime(matchPost.getMatchTime())
                    .place(matchPost.getPlace())
                    .matchPlace(matchPost.getMatchPlace())
                    .numPerson(matchPost.getNumPerson())
                    .matchStatus(matchPost.getMatchStatus())
                    .level(matchPost.getLevel())
                    .canParking(matchPost.getCanParking())
                    .matchPrice(matchPost.getMatchPrice())
                    .nickname(matchPost.getNickname())
                    .build();

//            matchDTO.setId(matchPost.getId());
//            matchDTO.setMatchDate(matchPost.getMatchDate());
//            matchDTO.setMatchTime(matchPost.getMatchTime());
//            matchDTO.setPlace(matchPost.getPlace());
//            matchDTO.setMatchPlace(matchPost.getMatchPlace());
//            matchDTO.setNumPerson(matchPost.getNumPerson());
//            matchDTO.setMatchStatus(matchPost.getMatchStatus());
//            matchDTO.setLevel(matchPost.getLevel());
//            matchDTO.setCanParking(matchPost.getCanParking());
//            matchDTO.setMatchPrice(matchPost.getMatchPrice());
//            matchDTO.setNickname(matchPost.getNickname());

            dtos.add(matchDTO);
        }
        return dtos;
    }

    // 게시판 세부 조회
    public Optional<MatchDTO> getBoardDetail(Integer id) {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<MatchPost> match = matchPostRepository.findById(id);

        MatchDTO matchDTO = MatchDTO.builder()
                .id(match.get().getId())
                .matchTime(match.get().getMatchTime())
                .matchDate(match.get().getMatchDate())
                .postTime(match.get().getPostTime())
                .postDate(match.get().getPostDate())
                .place(match.get().getPlace())
                .matchPlace(match.get().getMatchPlace())
                .matchPrice(match.get().getMatchPrice())
                .level(match.get().getLevel())
                .canParking(match.get().getCanParking())
                .matchStatus(match.get().getMatchStatus())
                .numPerson(match.get().getNumPerson())
                .matchContact(match.get().getMatchContact())
                .mainText(match.get().getMainText())
                .nickname(match.get().getNickname())
                .build();

        boolean flag = customUserDetails.getNickName().equals(matchDTO.getNickname());

        matchDTO.setCanEdit(flag);

        return Optional.of(matchDTO);
    }

    // 게시판 업데이트
    public boolean updateBoard(Integer id, MatchDTO updateMatchDTO) {
        Optional<MatchPost> optionalMatchPost = matchPostRepository.findById(id);

        if (optionalMatchPost.isPresent()) {
            MatchPost matchPost = optionalMatchPost.get();

            matchPost.setMatchTime(updateMatchDTO.getMatchTime());
            matchPost.setMatchDate(updateMatchDTO.getMatchDate());
            matchPost.setPostTime(updateMatchDTO.getPostTime());
            matchPost.setPostDate(updateMatchDTO.getPostDate());
            matchPost.setPlace(updateMatchDTO.getPlace());
            matchPost.setMatchPlace(updateMatchDTO.getMatchPlace());
            matchPost.setLevel(updateMatchDTO.getLevel());
            matchPost.setMatchPrice(updateMatchDTO.getMatchPrice());
            matchPost.setNumPerson(updateMatchDTO.getNumPerson());
            matchPost.setCanParking(updateMatchDTO.getCanParking());
            matchPost.setMatchStatus(updateMatchDTO.getMatchStatus());
            matchPost.setMatchContact(updateMatchDTO.getMatchContact());
            matchPost.setMainText(updateMatchDTO.getMainText());

            matchPostRepository.save(matchPost);

            return true;
        } else {
            return false;
        }
    }

    // 게시판 저장
    public Boolean savedBoard(MatchDTO matchDTO) {
        try {
            // 인증되어있는 객체에서 userName가져오기
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUid(uid);

//        matchDTO.setNickname(optionalUser.get().getNickname());
//        MatchPost matchPost = matchDTO.toEntity();
//        matchPost.setUser(optionalUser.get());
            MatchPost matchPost = new MatchPost();
            matchPost.setId(matchDTO.getId());
            matchPost.setMatchTime(matchDTO.getMatchTime());
            matchPost.setMatchDate(matchDTO.getMatchDate());
            matchPost.setPostTime(matchDTO.getPostTime());
            matchPost.setPostDate(matchDTO.getPostDate());
            matchPost.setPlace(matchDTO.getPlace());
            matchPost.setMatchPlace(matchDTO.getMatchPlace());
            matchPost.setMatchPrice(matchDTO.getMatchPrice());
            matchPost.setLevel(matchDTO.getLevel());
            matchPost.setCanParking(matchDTO.getCanParking());
            matchPost.setMatchStatus(matchDTO.getMatchStatus());
            matchPost.setNumPerson(matchDTO.getNumPerson());
            matchPost.setMatchContact(matchDTO.getMatchContact());
            matchPost.setMainText(matchDTO.getMainText());
            matchPost.setNickname(optionalUser.get().getNickname());
            matchPost.setUser(optionalUser.get());

            matchPostRepository.save(matchPost);
            return true;
        } catch (Exception e) {
            log.warn(e.getMessage());
            return false;
        }

    }

    // 게시판 삭제
    public void deleteBoard(Integer id) {
        matchPostRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 게시물이 없습니다." + id));
        matchPostRepository.deleteById(id);
    }

    // 매칭 마감
    public boolean matchFinished(Integer id) {
        MatchPost matchPost = matchPostRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("존재하지않는 게시물입니다." + id));

        String str = matchPost.getMatchStatus().equals("매칭중") ? "매칭 마감" : "매칭중";

        try {
            matchPost.setMatchStatus(str);
            matchPostRepository.save(matchPost);
            return true;
        } catch (Exception e) {
            log.info(String.valueOf(e));
            return false;
        }
    }

    // 중복회원 검증
    private void validateDuplicateTeam(Team team) {
        teamRepository.findByTeamName(team.getTeamName()).
                ifPresent(m -> {
                    throw new AlreadyRegisteredTeamException("이미 존재하는 팀입니다.");
                });
        teamRepository.findByNickname(team.getNickname()).
                ifPresent(m -> {
                    throw new AlreadyRegisteredUserException("이미 팀을 등록한 유저입니다.");
                });
    }
}
